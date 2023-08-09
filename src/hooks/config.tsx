import { useContext } from "react"
import { AppConfigContext } from "../context/config"

export const useConfig = () => {
    const config = useContext(AppConfigContext);

    return config
}