import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
    return (
        <Box mb={4}>
            <HStack my={8}>
                <Divider></Divider>
                <Text
                    textTransform={"uppercase"}
                    fontSize={"xs"}
                    as={"b"}
                    color={"gray.500"}
                >
                    Or
                </Text>
                <Divider></Divider>
            </HStack>

            <VStack>
                <Button
                    w={"100%"}
                    leftIcon={<FaGithub />}
                    colorScheme="telegram"
                >
                    Continue with Github
                </Button>
                <Button
                    w={"100%"}
                    leftIcon={<FaComment />}
                    colorScheme="yellow"
                >
                    Continue with Kakao
                </Button>
            </VStack>
        </Box>
    );
}
