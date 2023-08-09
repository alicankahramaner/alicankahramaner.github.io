import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { createContext, useCallback, useState } from "react";

interface LoadingContextType {
    loadingKeys: string[];
    addLoading(key: string): void;
    removeLoading(key: string): void;
}

export const LoadingContext = createContext<LoadingContextType>({
    addLoading: () => { },
    loadingKeys: [],
    removeLoading: () => { }
});

export const LoadingProvider: React.FC = props => {

    const [state, setState] = useState<string[]>([]);

    const addLoading = useCallback((key: string) => {
        setState(prev => prev.concat(key));
    }, [setState])

    const removeLoading = useCallback((key: string) => {
        setState(prev => prev.filter(currentKey => currentKey !== key));
    }, [setState])

    return <LoadingContext.Provider
        value={{
            addLoading,
            loadingKeys: state,
            removeLoading
        }}
    >
        <Spin size="large" indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} tip="Loading..." spinning={state.length > 0}>
            {props.children}
        </Spin>
    </LoadingContext.Provider>
}