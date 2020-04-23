import { iRoute } from '../Models/System';
import * as  H from 'history';
import { Config } from '../Helper/Config';

import { Home } from '../Pages/Home';
import { About } from '../Pages/About';
import { Error404 } from '../Pages/404';

export const Routes: iRoute[] = [
    {
        name: 'index.html',
        url: '/',
        title: 'Index.',
        component: Home
    },
    {
        name: 'hakkimda.html',
        url: '/About',
        title: 'About',
        component: About

    },
    {
        name: "404",
        title: "404",
        isErrorPage: true,
        component: Error404,
        url: ''
    }

];

export const GetActiveRouteTitle = (path: string) => {
    if (path === '/') {
        return null;
    }

    let activeRoute = Routes.find(r => r.url.replace('/', '').includes(path.replace('/', '')));

    return activeRoute ? activeRoute.title : null;
}

export const UpdateAppTitle = (location?: H.Location) => {
    if (!location) {
        return null;
    }
    let pageTitle = GetActiveRouteTitle(location.pathname);

    if (pageTitle !== null) {
        document.title = `${Config.AppTitle} - ${pageTitle}`;
    } else {
        document.title = Config.AppTitle;
    }
}