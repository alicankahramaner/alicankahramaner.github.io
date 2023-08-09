import { useCallback } from "react";
import { useHttp } from "../../hooks/http"
import { PostDto } from "./post";

export const usePostService = () => {
    const { get } = useHttp();

    const getAll = useCallback(async () => {
        return await get<PostDto[]>('posts');
    }, [get]);

    return {
        getAll
    }
}