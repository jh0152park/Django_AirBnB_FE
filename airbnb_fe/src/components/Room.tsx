import {
    Box,
    Button,
    Grid,
    HStack,
    Image,
    Text,
    VStack,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

export default function Room() {
    return (
        <VStack alignItems={"flex-start"}>
            <Box
                position={"relative"}
                overflow={"hidden"}
                rounded={"2xl"}
                mb={2}
            >
                <Image
                    minHeight="280"
                    src="https://a0.muscache.com/im/pictures/6943ce46-c64f-43b4-824b-5551735befcc.jpg?im_w=720"
                ></Image>
                <Button
                    variant={"unstyled"}
                    cursor={"pointer"}
                    color="white"
                    position={"absolute"}
                    top={0}
                    right={0}
                >
                    <FaRegHeart size={"20px"}></FaRegHeart>
                </Button>
            </Box>

            <Grid templateColumns={"6fr 1fr"}>
                <Text display={"block"} as="b" noOfLines={1} fontSize={"md"}>
                    Ubud, Bali, Indonesia
                </Text>
                <HStack spacing={1} alignItems={"center"}>
                    <FaStar size={12}></FaStar>
                    <Text>5.0</Text>
                </HStack>
            </Grid>

            <Text fontSize={"sm"} color={"gary.600"}>
                <Text as={"b"}>₩175,873</Text> /박
            </Text>
        </VStack>
    );
}
