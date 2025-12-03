import { useSearchParams } from "react-router-dom";

export function useRouterParams() {
    const [searchParams, setSearchParams] = useSearchParams();

    const setParam = (key: string, value: string) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            params.set(key, value);
            return params;
        });
    };

    const getParam = (key: string) => {
        return searchParams.get(key);
    };

    const deleteParam = (key: string) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            params.delete(key);
            return params;
        });
    };

    const deleteParams = (keys: string[]) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            keys.forEach(k => params.delete(k));
            return params;
        });
    };

    const setParams = (obj: Record<string, string>) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            Object.entries(obj).forEach(([key, value]) => {
                params.set(key, value);
            });
            return params;
        });
    };

    return {
        searchParams,

        getParam,
        setParam,
        deleteParam,
        deleteParams,
        setParams,
    };
}
