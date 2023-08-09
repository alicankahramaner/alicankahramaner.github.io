import { DashboardOutlined } from "@ant-design/icons";
import { Main } from "../components/system/main";
import { Dashboard } from "../pages/dashboard/dashboard";
import { Error404 } from "../pages/404";
import { Login } from "../pages/login/login";
import { IRouteProp } from "./type";
import { Home } from "../pages/home/home";

export const mainRouteList: IRouteProp[] = [

    {
        path: '/',
        element: <Home />,
        id: 'home'
    },
    {
        element: <Main />,
        path: '/admin',
        isDashboard: true,
        id: 'layout',
        children: [
            {
                path: '/admin',
                element: <Login />,
                id: 'login'
            },
            {
                path: '/admin/dashboard',
                element: <Dashboard />,
                id: 'dashboard',
                handle: {
                    title: 'Dashboard',
                    icon: DashboardOutlined
                }

            }
        ]
    },
    {
        id: 'error-page',
        element: <Error404 />,
        path: '*'
    }
];

export const dashboardRoutes = (): IRouteProp[] => {
    const dashboardRoute = mainRouteList.find(route => route.isDashboard);
    if (!dashboardRoute) return [];
    return dashboardRoute.children || []
}