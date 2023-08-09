import { ConfigProvider, MenuTheme, theme } from "antd";
import { ThemeConfig } from "antd/es/config-provider/context";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useBrowserStorage } from "../hooks/browserStorage";
import localeTr from 'antd/locale/tr_TR'
import * as Styled from 'styled-components'

const GlobalStyle = Styled.createGlobalStyle`
  body {
    background-color: #F5F5F7;
  }
`

interface ThemeContextType {
    mode: MenuTheme;
    toggleThemeMode(): void;
    theme: ThemeConfig;
}

export const ThemeContext = createContext<ThemeContextType>({
    toggleThemeMode: () => { },
    mode: 'light',
    theme: {}
});

export const ThemeProvider: React.FC = props => {

    const [mode, setMode] = useState<MenuTheme>('light');
    const browserStorage = useBrowserStorage();

    const toggleThemeMode = useCallback(async () => {
        setMode(p => p === 'dark' ? 'light' : 'dark');
    }, [setMode])

    useEffect(() => {
        let savedMode = browserStorage.get<MenuTheme>('theme-mode');
        if (savedMode && (savedMode === 'dark' || savedMode === 'light')) {
            setMode(savedMode);
        } else {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setMode('dark')
            }
        }
    }, [setMode, browserStorage])

    useEffect(() => {
        browserStorage.set('theme-mode', mode);
    }, [mode, browserStorage])

    const themeData: ThemeConfig = useMemo(() => {
        return {
            algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
        }
    }, [mode]);

    const styledThemeData = {
        colors: {
            orange: '#E94B1B',
            blue: '#622AFF',
            purple: '#8D1287',
            gray: '#5B5B5B',
            darkBlue: '#251C31'
        }
    }

    return <ThemeContext.Provider
        value={{
            mode,
            toggleThemeMode,
            theme: themeData
        }}
    >
        <ConfigProvider
            theme={themeData}
            locale={localeTr}
            componentSize="middle"
            csp={{
                nonce: 'default-src'
            }}
        >
            <Styled.ThemeProvider theme={styledThemeData}>
                <>
                    <GlobalStyle />
                    {props.children}
                </>
            </Styled.ThemeProvider>
        </ConfigProvider>
    </ThemeContext.Provider>
}