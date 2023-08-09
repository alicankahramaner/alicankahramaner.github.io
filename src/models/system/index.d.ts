import { Params } from "react-router-dom";
import { IRouteHandleProps } from "../../routes/type";
export interface LoginDto {
    username: string;
    password: string;
}

export interface ConfigDto {
    name: string;
    title:string;
    apiBaseUrl: string;
    authPagePath: string;
    httpTimeout: number;
    authLocalstorageKey: string;
    languages:string[];
}

export interface LocalStorageDto {
    key: string;
    value: string | null;
}

export interface UseMatchesDto {
    id: string;
    pathname: string;
    params: Params<string>;
    data: unknown;
    handle: IRouteHandleProps;
}