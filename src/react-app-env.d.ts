/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'local' | 'staging'
        PUBLIC_URL: string
        REACT_APP_NAME: string;
        REACT_APP_TITLE: string;
        REACT_APP_API_BASE_URL: string;
        REACT_APP_AUTH_PAGE_PATH: string;
        REACT_APP_HTTP_TIMEOUT: number;
        REACT_APP_AUTH_LOCALSTORAGE_KEY: string;
        REACT_APP_LANGUAGES: string;
    }
}