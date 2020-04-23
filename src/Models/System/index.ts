import { RouteProps } from "react-router-dom";

export interface ActionType {
    type: string,
    data: any;
    reducerName?: string;
}

export interface ConfigDto {
    AppName: string;
    AppTitle: string;
}

export interface iReducerType<State> { };

export declare type iReducer<State> = (state: State, action: ActionType) => iReducerType<State>;

export interface iRoute extends RouteProps {
    name: string;
    title: string;
    isErrorPage?: boolean;
    url: string;
}

export interface SystemDto {
    Title: string;
    ComponentId: string;
}

export enum DirectionEnum {
    Top = 'top',
    TopLeft = 'topLeft',
    TopRight = 'topRight',

    Bottom = 'bottom',
    BottomLeft = 'bottomLeft',
    BottomRight = 'bottomRight',

    Right = 'right',
    Left = 'left',

    Middle = 'middle',
    MiddleLeft = 'middleLeft',
    MiddleRight = 'middleRight',
}

export interface SizeDto {
    width: number;
    height: number;
}