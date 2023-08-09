import { notification } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
import { createContext, useMemo } from "react";

const NotificationBaseContext = createContext({ name: `${process.env.REACT_APP_NAME}-notification` });

const NotificationBaseProvider: React.FC = props => {
    const contextValue = useMemo(() => ({ name: `${process.env.REACT_APP_NAME}-notification` }), []);

    return (
        <NotificationBaseContext.Provider value={contextValue}>
            {props.children}
        </NotificationBaseContext.Provider>
    )
}

interface NotificationContextType extends NotificationInstance {

}

export const NotificationContext = createContext<NotificationContextType>({
    destroy: () => { },
    error: () => { },
    info: () => { },
    open: () => { },
    success: () => { },
    warning: () => { }
})

export const NotificationProvider: React.FC = props => {
    const [api, contextHolder] = notification.useNotification();
    return (
        <NotificationBaseProvider>
            {contextHolder}
            <NotificationContext.Provider value={api}>
                {props.children}
            </NotificationContext.Provider>
        </NotificationBaseProvider>
    )
}