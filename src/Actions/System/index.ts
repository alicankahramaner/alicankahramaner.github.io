import { Dispatch } from "react";
import { ActionType } from '../../Models/System/index';
import { SystemActionTypes } from "../../Reducers/System";

export const UpdateTitle = (title: string) => {
    return async (dispatch: Dispatch<ActionType>) => {

        dispatch({
            type: SystemActionTypes.UpdateTitle,
            data: title
        });

        return true;
    }
}

export const ComponentId = () => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch({
            type: SystemActionTypes.ComponentId,
            data: true
        });
    }
}

export interface SystemActionDeclarations {
    UpdateTitle(): true | false;
    ComponentId(): true | false;
}