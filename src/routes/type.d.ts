import React from "react";
import { IndexRouteObject, Location, NavigateFunction, NonIndexRouteObject, Params } from "react-router-dom";

interface IRouteHandleProps {
    isPublic?: true,
    noMenu?: boolean;
    icon?: React.FunctionComponentElement;
    title?: string;
}

export interface IRouteProp extends NonIndexRouteObject {
    element?: React.ReactNode | React.FunctionComponent;
    id: string;
    children?: IRouteProp[],
    isDashboard?: boolean;
    handle?: IRouteHandleProps;
}