import { useContext } from "react"
import { NotificationContext } from "../context/notification"

export const useNotification = () => {
    const api = useContext(NotificationContext);
    return api
}