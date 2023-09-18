import { useQuery } from "react-query";
import { getMe } from "../Api";

export default function useUser() {
    const { isLoading, data, isError } = useQuery<IMe>(["me"], getMe, {
        retry: false,
    });

    return {
        userLoading: isLoading,
        user: data,
        isLooggedIn: !isError,
    };
}
