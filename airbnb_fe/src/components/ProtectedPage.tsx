import { useEffect } from "react";
import useUser from "../lib/useUser";
import { useNavigate } from "react-router-dom";

interface IProtectedPageProps {
    children: React.ReactNode;
}

export default function ProtectedPage({ children }: IProtectedPageProps) {
    const navigate = useNavigate();
    const { userLoading, isLooggedIn } = useUser();

    useEffect(() => {
        if (!userLoading) {
            // loading end
            if (!isLooggedIn) {
                // not logged in
                navigate("/");
            }
        }
    }, [userLoading, isLooggedIn]);

    return <>{children}</>;
}
