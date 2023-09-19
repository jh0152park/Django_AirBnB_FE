import { Heading, Spinner, Text, VStack, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLogin } from "../Api";
import { useMutation, useQueryClient } from "react-query";

export default function KakaoConfirm() {
    const location = useLocation();
    const toast = useToast();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const code = new URLSearchParams(location.search).get("code");
    const mutation = useMutation(kakaoLogin, {
        onMutate: () => {
            //when start mutation
            console.log("start mutation the kakao login function");
        },

        onSuccess: () => {
            toast({
                status: "success",
                title: "Login success",
                description: "Good to see you again 😎",
            });
            queryClient.refetchQueries(["me"]);
            navigate("/");
        },

        onError: () => {
            toast({
                status: "error",
                title: "Login failed",
                description:
                    "Someting went wrong...😭 Please try check on your github account",
            });
            navigate("/");
        },
    });
    // https://github.com/jh0152park/Django_AirBnB_FE/commit/8c390cd346640dd58cd7e394cabdd2a80783a43f

    useEffect(() => {
        if (code) {
            mutation.mutate({ code });
        }
    }, []);

    return (
        <VStack justifyContent={"center"} mt={40}>
            <Heading>Login with kakao...</Heading>
            <Text>Don't go anywhere, please stay here!</Text>
            <Spinner mt={5} size={"lg"}></Spinner>
        </VStack>
    );
}
