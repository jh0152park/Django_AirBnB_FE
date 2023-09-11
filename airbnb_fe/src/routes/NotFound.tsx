import { Button, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <VStack justifyContent={"center"} minH={"100vh"} bgColor={"gray.100"}>
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
