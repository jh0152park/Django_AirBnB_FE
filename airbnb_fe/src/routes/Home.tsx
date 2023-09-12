import {
    Box,
    Grid,
    HStack,
    Heading,
    Image,
    Text,
    VStack,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function Home() {
    return (
        <Grid
            px={20}
            mt={10}
            templateColumns={"repeat(5, 1fr)"}
            columnGap={4}
            rowGap={8}
        >
            <VStack alignItems={"flex-start"}>
                <Box overflow={"hidden"} rounded={"2xl"} mb={2}>
                    <Image
                        height={250}
                        src="https://a0.muscache.com/im/pictures/6943ce46-c64f-43b4-824b-5551735befcc.jpg?im_w=720"
                    ></Image>
                </Box>

                <Grid templateColumns={"6fr 1fr"}>
                    <Text
                        display={"block"}
                        as="b"
                        noOfLines={1}
                        fontSize={"md"}
                    >
                        Ubud, Bali, Indonesia
                    </Text>
                    <HStack spacing={1}>
                        <FaStar size={15}></FaStar>
                        <Text>5.0</Text>
                    </HStack>
                </Grid>

                <Text fontSize={"sm"} color={"gary.600"}>
                    <Text as={"b"}>₩175,873</Text> /박
                </Text>
            </VStack>
        </Grid>
    );
}
