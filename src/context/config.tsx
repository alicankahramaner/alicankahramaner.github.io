import React, { useState } from 'react';
import { ConfigDto } from '../models/system';

const configData: ConfigDto = {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL,
    authPagePath: process.env.REACT_APP_AUTH_PAGE_PATH,
    httpTimeout: process.env.REACT_APP_HTTP_TIMEOUT,
    name: process.env.REACT_APP_NAME,
    title: process.env.REACT_APP_TITLE,
    authLocalstorageKey: process.env.REACT_APP_AUTH_LOCALSTORAGE_KEY,
    languages: process.env.REACT_APP_LANGUAGES.split(',')
}

export const AppConfigContext = React.createContext<ConfigDto>(configData);

export const AppConfigProvider: React.FC = (props) => {

    const [state] = useState<ConfigDto>(configData);

    return <AppConfigContext.Provider value={state}>{props.children}</AppConfigContext.Provider>
}
