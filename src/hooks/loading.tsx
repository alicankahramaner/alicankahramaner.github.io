import { useContext } from "react"
import { LoadingContext } from "../context/loading"

export const useLoading = () => {
    const { addLoading, removeLoading } = useContext(LoadingContext);

    return {
        addLoading,
        removeLoading
    }
}