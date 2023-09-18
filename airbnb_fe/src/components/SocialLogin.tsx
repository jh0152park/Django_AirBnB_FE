import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
    const kakaoParams = {
        response_type: "code",
        client_id: "fcb3b6ccc19cc01f2fe6aa6bf4cf63dc",
        redirect_uri: "http://127.0.0.1:3000/social/kakao",
    };
    const kakao_params = new URLSearchParams(kakaoParams).toString();

    const githubParams = {
        client_id: "bf19cc5900af3a5bca3c",
        scope: "read:user,user:email",
    };
    const github_params = new URLSearchParams(githubParams).toString();
    console.log(github_params);

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
                    as="a"
                    href={`https://github.com/login/oauth/authorize?${github_params}`}
                    w={"100%"}
                    leftIcon={<FaGithub />}
                >
                    Continue with Github
                </Button>
                <Button
                    as="a"
                    href={`https://kauth.kakao.com/oauth/authorize?${kakao_params}`}
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
