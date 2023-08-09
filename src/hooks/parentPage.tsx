import React from "react";
import { useOutlet } from "react-router-dom"

export const useParentPage = (node: React.ReactElement) => {

    const outlet = useOutlet();

    if (outlet) {
        return outlet
    }

    return node;
}