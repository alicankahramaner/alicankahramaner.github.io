import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { createContext, useCallback, useMemo } from "react";
import { useAuth } from "../hooks/auth";
import { useConfig } from "../hooks/config";
import { useLoading } from "../hooks/loading";

export interface HttpContextType {
    instance: AxiosInstance;
    methods: {
        post<Req, Res>(url: string, data: Req, options?: AxiosRequestConfig): Promise<Res | false>
        get<Res>(url: string, options?: AxiosRequestConfig): Promise<Res | false>
        put<Req, Res>(url: string, data: Req, options?: AxiosRequestConfig): Promise<Res | false>
        delete<Res>(url: string, options?: AxiosRequestConfig): Promise<Res | false>
    }
}

export const HttpContext = createContext<HttpContextType | null>(null);

export const HttpProvider: React.FC = (props) => {
    const { apiBaseUrl, httpTimeout } = useConfig()
    const { clearAuth } = useAuth();
    const { addLoading, removeLoading } = useLoading()

    const errorHandler = useCallback(async (value: AxiosResponse) => {
        switch (value.status) {
            case 401:
                clearAuth();
                break;
            default:
                break;
        }

        return value;
    }, [clearAuth]);

    const onRequest = useCallback(async (value: InternalAxiosRequestConfig) => {
        addLoading(value.url as string);
        return value;
    }, [addLoading]);

    const onRequestRejected = useCallback(async (value) => {
        removeLoading(value.config.url as string);
        return await Promise.resolve({ data: false })
    }, [removeLoading]);

    const onResponse = useCallback(async (value: AxiosResponse) => {
        removeLoading(value.config.url as string);
        errorHandler(value)
        return value;
    }, [errorHandler, removeLoading]);

    const onResponseRejected = useCallback(async () => {
        return await Promise.resolve({ data: false })
    }, []);

    const instance = useMemo(() => {
        const instance = axios.create({
            baseURL: apiBaseUrl,
            timeout: httpTimeout,
            headers: {
                common: {
                    'Content-Type': 'application/json'
                }
            }
        });

        instance.interceptors.request.use(onRequest, onRequestRejected)
        instance.interceptors.response.use(onResponse, onResponseRejected)

        return instance
    }, [apiBaseUrl, httpTimeout, onRequest, onResponse, onRequestRejected, onResponseRejected]);

    const methods = useMemo(() => {
        return {
            post: async <Req = any, Res = any>(url: string, data: Req, options?: AxiosRequestConfig): Promise<Res | false> => {
                return await instance.post(url, data, options).then(res => res.data).catch(e => false);
            },
            put: async <Req = any, Res = any>(url: string, data: Req, options?: AxiosRequestConfig): Promise<Res | false> => {
                return await instance.put(url, data, options).then(res => res.data).catch(() => false);
            },
            get: async <Res = any>(url: string, options?: AxiosRequestConfig): Promise<Res | false> => {
                return await instance.get(url, options).then(res => res.data).catch(() => false);
            },
            delete: async <Res = any>(url: string, options?: AxiosRequestConfig): Promise<Res | false> => {
                return await instance.delete(url, options).then(res => res.data).catch(() => false);
            }
        }
    }, [instance]);

    return <HttpContext.Provider value={{
        instance: instance,
        methods: methods
    }}>{props.children}</HttpContext.Provider>
}