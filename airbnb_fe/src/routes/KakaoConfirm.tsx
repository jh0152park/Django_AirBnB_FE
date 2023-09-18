import { Heading, Spinner, Text, VStack, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLogin } from "../Api";
import { useQueryClient } from "react-query";

export default function KakaoConfirm() {
    const location = useLocation();
    const toast = useToast();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    async function loginConfirm() {
        const code = new URLSearchParams(location.search).get("code");
        if (code) {
            console.log(code);

            // const status = await kakaoLogin(code);

            // if (status === 200) {
            //     toast({
            //         status: "success",
            //         title: "Login success",
            //         description: "Good to see you again 😎",
            //     });
            //     queryClient.refetchQueries(["me"]);
            // } else {
            //     toast({
            //         status: "error",
            //         title: "Login failed",
            //         description:
            //             "Someting went wrong...😭 Please try check on your github account",
            //     });
            // }
            // navigate("/");
        }
    }

    useEffect(() => {
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
