import {
    Button,
    Heading,
    Text,
    VStack,
    useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
    const bgColor = useColorModeValue("gray.100", "gray.600");

    return (
        <VStack justifyContent={"center"} minH={"100vh"} bgColor={bgColor}>
            <Heading>Page not found 😟</Heading>
            <Text>It seems that you're lost.</Text>
            <Link to="/">
                <Button colorScheme={"facebook"} variant={"link"}>
                    Go Home →
                </Button>
            </Link>
        </VStack>
    );
}
