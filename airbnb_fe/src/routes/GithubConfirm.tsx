import { Heading, Spinner, Text, VStack, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogin } from "../Api";
import { useQueryClient } from "react-query";

export default function GithubConfirm() {
    const location = useLocation();
    const toast = useToast();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    async function loginConfirm() {
        const code = new URLSearchParams(location.search).get("code");
        if (code) {
            const status = await githubLogin(code);

            if (status === 200) {
                toast({
                    status: "success",
                    title: "Login success",
                    description: "Good to see you again 😎",
                });
                queryClient.refetchQueries(["me"]);
            } else {
                toast({
                    status: "error",
                    title: "Login failed",
                    description:
                        "Someting went wrong...😭 Please try check on your github account",
                });
            }
            navigate("/");
        }
    }

    useEffect(() => {
        console.log("run login confirm");
        loginConfirm();
    }, []);

    return (
        <VStack justifyContent={"center"} mt={40}>
            <Heading>Login with giuhub...</Heading>
            <Text>Don't go anywhere, please stay here!</Text>
            <Spinner mt={5} size={"lg"}></Spinner>
        </VStack>
    );
}
