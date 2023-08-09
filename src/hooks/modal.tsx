import { useContext } from "react"
import { ModalContext } from "../context/modal"

export const useModal = () => {
    const api = useContext(ModalContext);

    return {
        ...api
    }
}