import {
    Button,
    Heading,
    Spinner,
    Text,
    VStack,
    useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { githubLogin } from "../Api";

export default function GithubConfirm() {
    const location = useLocation();

    useEffect(() => {
        const code = new URLSearchParams(location.search).get("code");
        if (code) {
            githubLogin(code as string);
        }
    }, []);

    return (
        <VStack justifyContent={"center"} mt={40}>
            <Heading>Login with giuhub...</Heading>
            <Text>Don't go anywhere, please stay here!</Text>
            <Spinner mt={5} size={"lg"}></Spinner>
        </VStack>
    );
}
