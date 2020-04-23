import * as React from 'react';

import { store } from '../Store';
import { SystemActionTypes } from '../Reducers/System';

export interface BaseComponentProps {
    className?: string[];
}

export class BaseComponent<P, S> extends React.Component<P, S>{
    public name: string = '';
    public styleProperties: React.CSSProperties = {};

    get id() {
        let currentId: string | number = parseInt((store.getState().System as any).ComponentId);
        currentId++;
        currentId = currentId.toString();

        store.dispatch({ type: SystemActionTypes.ComponentId, data: currentId });

        return currentId;
    }
}