import * as React from 'react';
import { NavLinkProps, NavLink } from 'react-router-dom';

export const NLink: React.FunctionComponent<NavLinkProps> = (props) => {

    const onClickNav = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (e.currentTarget.className.includes('active')) {
            e.preventDefault();
        }
    }

    return (
        <NavLink
            {...props}
            onClick={(event) => {
                onClickNav(event);
                props.onClick && props.onClick(event);
            }}
        >
            {props.children}
        </NavLink>
    );
}