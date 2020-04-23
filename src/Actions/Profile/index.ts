import { Dispatch } from "react";
import { ActionType } from '../../Models/System/index';
import { ProfileActionTypes } from "../../Reducers/Profile";

export const GetGithubProfileData = () => {
    return async (dispatch: Dispatch<ActionType>) => {
        dispatch({
            type: ProfileActionTypes.GetGithubProfile,
            data: {
                location: 'ist',
                name: 'alican',
            }
        });

        return true;
    }
}

export interface ProfileActionDeclarations {
    GetGithubProfileData(): true | false;
}