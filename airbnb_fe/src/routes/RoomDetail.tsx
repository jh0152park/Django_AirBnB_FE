import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getRoom, getRoomReviews } from "../Api";
import {
    Avatar,
    Box,
    Grid,
    GridItem,
    HStack,
    Heading,
    Image,
    Skeleton,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function RoomDetail() {
    const { roomPk } = useParams();
    const { isLoading, data } = useQuery<IRoomDetail>(
        ["room", roomPk],
        getRoom
    );
    const { isLoading: isReviewsLoading, data: ReviewData } = useQuery<
        IReview[]
    >(["room", roomPk, "reviews"], getRoomReviews);

    return (
        <Box
            px={{
                base: 10,
                lg: 20,
            }}
            mt={10}
        >
            {/* Title and tiny imfo */}
            <Stack>
                <Skeleton w="50%" h="40px" isLoaded={!isLoading}>
                    <Heading w="100vw" fontSize={"35px"}>
                        {data ? data.name : "Loading..."}
                    </Heading>
                </Skeleton>

                <Skeleton w="30%" isLoaded={!isLoading}>
                    <HStack w="100vw" fontSize={13} as={"b"} mt={-2}>
                        <FaStar size={13}></FaStar>
                        <Text ml={-1}>{data?.room_rate}</Text>
                        <Text>∙</Text>
                        <Text textDecor={"underline"}>
                            {data?.review_count} review
                            {data?.review_count === 1 ? "" : "s"}
                        </Text>
                        <Text>∙</Text>
                        <Text textDecor={"underline"}>
                            {data?.city},{data?.country}
                        </Text>
                    </HStack>
                </Skeleton>
            </Stack>

            {/* 5 detail photos */}
            <Grid
                templateColumns={"repeat(4, 1fr)"}
                templateRows={"repeat(2 1fr)"}
                h="60vh"
                gap={3}
                mt={8}
                rounded={"xl"}
                overflow={"hidden"}
            >
                {[0, 1, 2, 3, 4].map((index) => (
                    <GridItem
                        colSpan={!index ? 2 : 1}
                        rowSpan={!index ? 2 : 1}
                        overflow={"hidden"}
                        key={index}
                    >
                        <Skeleton isLoaded={!isLoading} h="100%" w="100%">
                            <Image
                                objectFit={"cover"}
                                w="100%"
                                h="100%"
                                src={data?.photo_set[index].file}
                            ></Image>
                        </Skeleton>
                    </GridItem>
                ))}
            </Grid>

            {/* Host and room info */}
            <HStack w={"40%"} mt={10} justifyContent={"space-between"}>
                <VStack alignItems={"flex-start"}>
                    <Skeleton isLoaded={!isLoading} height={"30px"}>
                        <Heading fontSize={"2xl"}>
                            House hosted by {data?.owner.name}
                        </Heading>
                    </Skeleton>

                    <Skeleton isLoaded={!isLoading}>
                        <HStack justifyContent={"flex-start"} w="100%">
                            <Text>
                                {data?.toilets} toilet
                                {data?.toilets === 1 ? "" : "s"}
                            </Text>
                            <Text>∙</Text>
                            <Text>
                                {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
                            </Text>
                        </HStack>
                    </Skeleton>
                </VStack>

                <Avatar
                    name={data?.owner.name}
                    size={"lg"}
                    src={data?.owner.profile_picture}
                ></Avatar>
            </HStack>

            <Box mt={10} alignItems={"center"}>
                <Skeleton isLoaded={!isLoading}>
                    <Heading>
                        <HStack w="100vw" as={"b"} mt={-2}>
                            <FaStar></FaStar>
                            <Text ml={-1}>{data?.room_rate}</Text>
                            <Text>∙</Text>
                            <Text>
                                {data?.review_count} review
                                {data?.review_count === 1 ? "" : "s"}
                            </Text>
                        </HStack>
                    </Heading>
                </Skeleton>
            </Box>
        </Box>
    );
}
