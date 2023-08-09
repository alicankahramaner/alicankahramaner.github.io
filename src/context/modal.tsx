import { ModalStaticFunctions } from "antd/es/modal/confirm";
import useModal from "antd/es/modal/useModal";
import { createContext, useMemo } from "react";

const ModalBaseContext = createContext({ name: `${process.env.REACT_APP_NAME}-modal` })

const ModalBaseContextProvider: React.FC = props => {
    const contextValue = useMemo(() => ({ name: `${process.env.REACT_APP_NAME}-modal` }), []);

    return <ModalBaseContext.Provider value={contextValue}>
        {props.children}
    </ModalBaseContext.Provider>
}

interface ModalContextType extends Omit<ModalStaticFunctions, 'warn'> {

}

export const ModalContext = createContext<ModalContextType>({} as ModalContextType)

export const ModalProvider: React.FC = props => {
    const [api, contextHolder] = useModal();

    return <ModalBaseContextProvider>
        {contextHolder}
        <ModalContext.Provider value={api}>
            {props.children}
        </ModalContext.Provider>
    </ModalBaseContextProvider>
}