import * as React from 'react';
import { iRoute } from '../../Models/System';
import { NLink } from './NLink';
import { BaseComponent } from '../BaseComponent';

interface HeaderProps {
    PagesRoutes: iRoute[];
}

export class Header extends BaseComponent<HeaderProps, any> {

    get pageNavLinks() {
        const pageNavLinks: React.ReactNode[] = [];
        this.props.PagesRoutes.forEach((r: iRoute, i: number) => {
            pageNavLinks.push(<NLink activeClassName="active" exact key={r.name} title={r.name} to={r.url}>{r.name}</NLink>);
        });

        return pageNavLinks;
    }


    render() {

        return (
            <div id="header">
                <nav className="navigation">
                    {this.pageNavLinks}
                </nav>

                <nav className="profileLinks">

                </nav>
            </div>
        );
    }
}
