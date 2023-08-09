import { useContext } from "react";
import { HttpContext, HttpContextType } from "../context/http";

export const useHttp = () => {
    const http = useContext<HttpContextType>(HttpContext as any);

    return http.methods;
}