import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getRoom } from "../Api";
import { Box, HStack, Heading, Skeleton, Text, VStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function RoomDetail() {
    const { roomPk } = useParams();
    const { isLoading, data } = useQuery<IRoomDetail>(
        ["room", roomPk],
        getRoom
    );

    return (
        <Box
            px={{
                base: 10,
                lg: 20,
            }}
            mt={10}
        >
            <VStack alignItems={"flex-start"}>
                <Skeleton height={"40px"} isLoaded={!isLoading}>
                    <Heading fontSize={"30px"}>{data?.name}</Heading>
                </Skeleton>
                <Skeleton isLoaded={!isLoading}>
                    <HStack fontSize={13} as={"b"} mt={-2}>
                        <FaStar size={13}></FaStar>
                        <Text ml={-1}>{data?.room_rate} · </Text>
                        <Text textDecor={"underline"}>
                            {data?.review_count} reviews
                        </Text>
                        <Text>·</Text>
                        <Text textDecor={"underline"}>
                            {data?.city},{data?.country}
                        </Text>
                    </HStack>
                </Skeleton>
            </VStack>
        </Box>
    );
}
