import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { checkBooingPossible, getRoom, getRoomReviews } from "../Api";
import {
    Avatar,
    Box,
    Button,
    Container,
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
import { FaPencilAlt, FaStar } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import type { Value } from "react-calendar/dist/cjs/shared/types";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

export default function RoomDetail() {
    const { roomPk } = useParams();
    const { isLoading, data } = useQuery<IRoomDetail>(
        ["room", roomPk],
        getRoom
    );
    const { isLoading: isReviewsLoading, data: ReviewData } = useQuery<
        IReview[]
    >(["room", roomPk, "reviews"], getRoomReviews);

    const DAY = 60 * 60 * 24;
    const MONTH = DAY * 30;

    const [dates, setDates] = useState<Date[]>();
    const navigate = useNavigate();

    const bookingPossible = useQuery(
        ["checkBooking", dates, roomPk],
        checkBooingPossible,
        {
            enabled: dates !== undefined,
            cacheTime: 0,
        }
    );

    function editRoomDetail() {
        navigate(`/rooms/${roomPk}/edit`);
    }

    return (
        <Box
            px={{
                base: 10,
                lg: 20,
            }}
            mt={10}
        >
            <Helmet>
                <title>{data ? data.name : "Loading..."}</title>
            </Helmet>
            {/* Title and tiny imfo */}
            <Stack>
                <Skeleton w="100%" h="40px" isLoaded={!isLoading}>
                    <Heading w="100%" fontSize={"35px"}>
                        {data ? data.name : "Loading..."}
                        {data?.is_owner ? (
                            <Button
                                bg={"none"}
                                _hover={{ color: "yellow.400" }}
                                onClick={editRoomDetail}
                            >
                                <FaPencilAlt />
                            </Button>
                        ) : null}
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
                            {data?.photo_set && data?.photo_set[index] ? (
                                <Image
                                    objectFit={"cover"}
                                    w="100%"
                                    h="100%"
                                    src={data?.photo_set[index].file}
                                ></Image>
                            ) : null}
                        </Skeleton>
                    </GridItem>
                ))}
            </Grid>

            <HStack w={"100%"}>
                <VStack w={"50%"}>
                    <HStack
                        w={"100%"}
                        justifyContent={"space-between"}
                        align={"flex-start"}
                    >
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
                                        {data?.rooms} room
                                        {data?.rooms === 1 ? "" : "s"}
                                    </Text>
                                    <Text>∙</Text>
                                    <Text>
                                        Pets {data?.pet_allow ? "" : "not "}{" "}
                                        allowed
                                        {data?.pet_allow ? " 🐶" : " 😭"}
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

                    <Box w={"100%"} h={"250px"} mt={2} overflow={"hidden"}>
                        <Text as="b">Description🗒️</Text>
                        {data?.description.split("\n").map((text, index) => (
                            <Text key={index}>
                                {text}
                                <br></br>
                            </Text>
                        ))}
                    </Box>
                </VStack>
                <Box mt={5} w={"50%"} h={"100%"} justifyContent={"center"}>
                    <VStack>
                        <Calendar
                            onChange={setDates as any}
                            next2Label={null}
                            prev2Label={null}
                            minDetail="month"
                            minDate={new Date()}
                            maxDate={new Date(Date.now() + MONTH * 6 * 1000)}
                            selectRange
                        ></Calendar>
                        <Button
                            mt={5}
                            w={"50%"}
                            colorScheme="red"
                            isLoading={bookingPossible.isLoading}
                            isDisabled={bookingPossible.data?.ok === false}
                        >
                            Booking
                        </Button>
                        {bookingPossible.data?.ok == false &&
                        !bookingPossible.isLoading ? (
                            <Text color={"red.500"}>
                                Can't book on those dates, sorry.
                            </Text>
                        ) : null}
                    </VStack>
                </Box>
            </HStack>

            <Box mt={10} alignItems={"center"}>
                <Skeleton isLoaded={!isLoading} h="40px" w={"20%"}>
                    <Heading fontSize={"2xl"} mb={5}>
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

                <Container marginX={"none"} maxW={"container.xl"} mt={10}>
                    <Grid templateColumns={"repeat(2, 1fr)"} gap={10}>
                        {isReviewsLoading
                            ? [1, 2, 3, 4].map((dummy) => (
                                  <Box>
                                      <VStack alignItems={"flex-start"}>
                                          <HStack>
                                              <Avatar size={"md"}></Avatar>
                                              <VStack
                                                  alignItems={"flex-start"}
                                                  spacing={0}
                                              >
                                                  <Skeleton
                                                      w={"200px"}
                                                      h="25px"
                                                  >
                                                      <Heading fontSize={"md"}>
                                                          Loading...
                                                      </Heading>
                                                  </Skeleton>

                                                  <Skeleton w={"50px"} h="10px">
                                                      <HStack spacing={1}>
                                                          <FaStar
                                                              size={"12px"}
                                                          ></FaStar>
                                                          <Text>
                                                              Loading...
                                                          </Text>
                                                      </HStack>
                                                  </Skeleton>
                                              </VStack>
                                          </HStack>
                                          <Skeleton w={"500px"} h={"150px"}>
                                              <Text>Loading...</Text>
                                          </Skeleton>
                                      </VStack>
                                  </Box>
                              ))
                            : ReviewData?.map((review, index) => (
                                  <Box>
                                      <VStack alignItems={"flex-start"}>
                                          <HStack>
                                              <Avatar
                                                  name={review.user.name}
                                                  src={
                                                      review.user
                                                          .profile_picture
                                                  }
                                                  size={"md"}
                                              ></Avatar>
                                              <VStack
                                                  alignItems={"flex-start"}
                                                  spacing={0}
                                              >
                                                  <Heading fontSize={"md"}>
                                                      {review.user.name}
                                                  </Heading>
                                                  <HStack spacing={1}>
                                                      <FaStar
                                                          size={"12px"}
                                                      ></FaStar>
                                                      <Text>
                                                          {review.rating}
                                                      </Text>
                                                  </HStack>
                                              </VStack>
                                          </HStack>
                                          <Text>{review.review}</Text>
                                      </VStack>
                                  </Box>
                              ))}
                    </Grid>
                </Container>
            </Box>

            {/* Host and room info */}
        </Box>
    );
}
