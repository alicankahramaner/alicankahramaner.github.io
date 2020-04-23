import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { UpdateAppTitle } from '../Routes';

interface BasePageProps<T> extends RouteComponentProps { }

interface BasePageState<T> { }

export class BasePage<P, S> extends React.Component<BasePageProps<P>, BasePageState<S>> {
    componentDidMount() {
        UpdateAppTitle(this.props.location);
    }
}