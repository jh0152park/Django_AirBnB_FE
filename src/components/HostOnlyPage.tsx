import { useEffect } from "react";
import useUser from "../lib/useUser";
import { useNavigate } from "react-router-dom";

interface IHostOnlyPageProps {
    children: React.ReactNode;
}

export default function HostOnlyPage({ children }: IHostOnlyPageProps) {
    const navigate = useNavigate();
    const { userLoading, user } = useUser();

    useEffect(() => {
        if (!userLoading) {
            // loading end
            if (!user?.is_host) {
                // not logged in
                navigate("/");
            }
        }
    }, [userLoading, user]);

    return <>{children}</>;
}
