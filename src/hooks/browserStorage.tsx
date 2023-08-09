import { useCallback, useMemo } from "react";
import { LocalStorageDto } from "../models/system";

interface BrowserStorageOptions {
    type?: 'session' | 'local'
}

export const useBrowserStorage = (options?: BrowserStorageOptions) => {

    const storage = useMemo(() => {
        if (options && options.type === 'session') {
            return window.sessionStorage;
        }

        return window.localStorage
    }, [options])


    /**
     * 
     * @param value any value 
     * @description any type to convert to string if a object value JSON stringfy 
     * @returns string
     */
    const convertValue = useCallback((value: any): string => {
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }

        return String(value);
    }, []);

    const getConvertedValue = useCallback(function <T = string>(value: string | null): T | null {
        let convertedValue: any = value;
        if (value === null) {
            return null;
        }

        try {
            let jsonParsed = JSON.parse(value);
            if (jsonParsed) {
                convertedValue = jsonParsed
            }
        } catch (error) {
        }

        return convertedValue as T;
    }, [])

    const set = useCallback((key: string, value: any) => {
        storage.setItem(key, convertValue(value))
    }, [storage, convertValue]);

    const get = useCallback(function <T = string>(key: string): T | null {
        return getConvertedValue<T>(storage.getItem(key));
    }, [storage, getConvertedValue]);

    const remove = useCallback((key: string) => {
        storage.removeItem(key);
    }, [storage]);

    const checkKey = useCallback((key: string): boolean => {
        let exist: boolean = false;
        for (let index = 0; index < storage.length; index++) {
            if (storage.key(index) === key) {
                exist = true;
                break;
            }
        }

        return exist;
    }, [storage]);

    const checkValue = useCallback((key: string, value: any): boolean => {
        const keyValue = get(key);

        return keyValue === convertValue(value);
    }, [convertValue, get])

    const getAllValue = useCallback((): LocalStorageDto[] => {
        const data: LocalStorageDto[] = [];
        for (let index = 0; index < storage.length; index++) {
            let key: string | null = storage.key(index);

            if (key === null) {
                continue;
            }

            data.push({
                key,
                value: get(key)
            });
        }

        return data;

    }, [get, storage])

    return useMemo(() => ({
        set,
        get,
        remove,
        checkKey,
        checkValue,
        getAllValue
    }), [
        set,
        get,
        remove,
        checkKey,
        checkValue,
        getAllValue
    ])
}