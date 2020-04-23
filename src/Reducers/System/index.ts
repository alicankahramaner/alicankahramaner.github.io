import { SystemDto, iReducer } from '../../Models/System/index';
import { RandomNumberGenerator } from '../../Helper/utils';

const SystemInitiliazeReducer: SystemDto = {
    Title: 'Home',
    ComponentId: RandomNumberGenerator()
}

export enum SystemActionTypes {
    UpdateTitle = 'System.UpdateTitle',
    ComponentId = 'system.ComponentId'
}

export const System: iReducer<SystemDto> = (state = SystemInitiliazeReducer, action) => {
    switch (action.type) {
        case SystemActionTypes.UpdateTitle:
            return { ...state, Title: action.data };
        case SystemActionTypes.ComponentId:
            let currentId = parseInt(state.ComponentId);
            currentId++;

            return { ...state, ComponentId: currentId };
        default:
            return state
    }
}
