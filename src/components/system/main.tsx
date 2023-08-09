import { BulbOutlined, FlagOutlined, InfoCircleOutlined, LogoutOutlined, MenuOutlined, QuestionCircleOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Drawer, FloatButton, Grid, Layout, Menu, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import React, { createElement, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation, } from 'react-i18next';
import { Outlet, useLocation, useMatches, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { useConfig } from '../../hooks/config';
import { useTheme } from '../../hooks/theme';
import { UseMatchesDto } from '../../models/system';
import { dashboardRoutes, mainRouteList } from '../../routes/routes';
import { IRouteProp } from '../../routes/type';
import { AuthGuard } from './authGuard';



export const Main: React.FC = (props) => {
    const { toggleThemeMode, mode } = useTheme();
    const { clearAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation()
    const config = useConfig();
    const { t, i18n } = useTranslation();
    const breakpoints = Grid.useBreakpoint();

    const { token } = theme.useToken();
    const breadCrumbRoutes = useMatches().filter(m => m.id !== 'layout') as UseMatchesDto[];

    const [activeKey, setActiveKeys] = useState<string[]>([]);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [mouseEnterSidebar, setMouseEnterSidebar] = useState<boolean>(false);
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false)

    const updateActiveKeys = useCallback(async () => {
        setActiveKeys(p => breadCrumbRoutes.map(e => e.id));
    }, [breadCrumbRoutes, setActiveKeys])

    const breadCrumbItems = useMemo(() => {
        return breadCrumbRoutes.filter(i => i.handle).map(item =>
            <Breadcrumb.Item key={item.pathname}>
                {item.handle.icon ? createElement(item.handle.icon) : null}
                {item.handle.title ? t(`Navigation.${item.handle.title}`) : undefined}
            </Breadcrumb.Item>)
    }, [breadCrumbRoutes, t])

    useEffect(() => {
        updateActiveKeys();
        // eslint-disable-next-line
    }, [setActiveKeys, location.pathname])

    const menuKeys = useMemo(() => {
        const list = breadCrumbRoutes.map(e => e.id).concat(activeKey);
        if (collapsed && !mouseEnterSidebar) {
            return list.filter(item => mainRouteList.find(r => r.id === item && r.path))
        }
        return list;
    }, [activeKey, collapsed, breadCrumbRoutes, mouseEnterSidebar])

    const createMenuItems = useCallback((routes: IRouteProp[] = dashboardRoutes()): any[] => {
        return routes.filter(route => route.handle && !route.handle.noMenu).map(item => {
            const route = { ...item };
            delete route.children;
            if (item.children) {
                return {
                    key: item.id,
                    label: item.handle && item.handle.title && t('Navigation.' + item.handle.title),
                    icon: item.handle && item.handle.icon && createElement(item.handle.icon),
                    children: createMenuItems([...item.children.filter(cRoute => cRoute.handle && !cRoute.handle.noMenu)])
                }
            } else {
                return {
                    key: item.id,
                    icon: item.handle && item.handle.icon && createElement(item.handle.icon),
                    onClick: () => {
                        item.path && navigate(item.path)
                    },
                    label: item.handle && item.handle.title && t('Navigation.' + item.handle.title),
                    type: item.children ? 'group' : undefined,
                }
            }
        })
    }, [navigate, t]);

    const sideMenuItems: ItemType[] = useMemo(() => {
        return createMenuItems();
    }, [createMenuItems])

    const NavigationMenu = () => <Menu
        theme={mode}
        mode="inline"
        selectedKeys={menuKeys}
        onClick={() => breakpoints.xs && setDrawerVisible(p => !p)}
        openKeys={menuKeys}
        style={{ height: '100%', borderRight: 0, background: breakpoints.xs ? token.colorBgContainer : token.colorPrimaryBg }}
        items={sideMenuItems}
        onMouseEnter={() => setMouseEnterSidebar(true)}
        onMouseLeave={() => setMouseEnterSidebar(false)}
        onOpenChange={(keys) => setActiveKeys(keys)}
    />


    const headerMenuItems: ItemType[] = useMemo(() => {
        const items: ItemType[] = [
            {
                icon: <SettingOutlined />,
                key: 'setting',
                children: [
                    {
                        key: 'toogleTheme',
                        label: mode === 'dark' ? 'Light' : 'Dark',
                        icon: <BulbOutlined />,
                        onClick: () => toggleThemeMode()
                    }
                ]
            },
            {
                icon: <FlagOutlined />,
                key: 'language',
                children: config.languages.map(langKey => ({
                    key: `lang-${langKey}`,
                    label: langKey.toUpperCase(),
                    onClick: () => i18n.changeLanguage(langKey)
                }))
            },
            {
                key: 'user',
                icon: <UserOutlined />,
                children: [
                    {
                        key: 'logout',
                        label: 'Logout',
                        icon: <LogoutOutlined />,
                        onClick: () => clearAuth()
                    }
                ]
            }
        ];
        if (breakpoints.xs) {
            items.push({
                key: 'drawer-btn',
                icon: <MenuOutlined />,
                onClick: () => setDrawerVisible(p => !p)
            })
        }

        return items;
    }, [breakpoints, setDrawerVisible, clearAuth, config.languages, i18n, mode, toggleThemeMode])

    return (
        <Layout style={{ height: '100vh' }}>
            <Header className="header" style={{ display: 'flex', justifyContent: 'space-between', background: token.colorPrimaryBg }}>
                <div
                    style={{
                        width: '270px'
                    }}
                >
                    <img src="/logo.png" alt={process.env.REACT_APP_NAME} />
                </div>
                <Menu
                    theme={mode}
                    mode="horizontal"
                    triggerSubMenuAction='click'
                    selectedKeys={[
                        "language",
                        `lang-${i18n.language}`
                    ]}
                    style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'end',
                        background: token.colorPrimaryBg
                    }}
                    items={headerMenuItems}
                />
            </Header>
            <Layout>
                <Drawer
                    placement='left'
                    open={drawerVisible}
                    onClose={() => setDrawerVisible(false)}
                    title={t('Menu')}
                >
                    {NavigationMenu()}
                </Drawer>
                <Sider
                    width={270}
                    hidden={breakpoints.xs}
                    style={{ background: token.colorPrimaryBg }}
                    collapsible
                    theme={mode}
                    collapsed={mouseEnterSidebar ? false : collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                >
                    {NavigationMenu()}
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {
                            breadCrumbItems
                        }
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: token.colorFillContent
                        }}
                    >
                        <AuthGuard>
                            <Outlet />
                        </AuthGuard>
                    </Content>
                </Layout>
            </Layout>
            <FloatButton.Group icon={<InfoCircleOutlined />} type="primary" trigger="click">
                <FloatButton tooltip="Help" icon={<QuestionCircleOutlined />} />
            </FloatButton.Group>
        </Layout>
    )
}