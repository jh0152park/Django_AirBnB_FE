import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FaPencilAlt, FaRegHeart, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function numberWithCommas(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Room({
    pk,
    imageUrl,
    name,
    room_rate,
    price,
    city,
    country,
    is_owner,
}: IRoomProps) {
    const navigate = useNavigate();

    function onEditClick(event: React.SyntheticEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (is_owner) {
            navigate(`/rooms/${pk}/photos`);
        }
    }

    return (
        <Link to={`/rooms/${pk}`}>
            <VStack alignItems={"flex-start"}>
                <Box
                    position={"relative"}
                    overflow={"hidden"}
                    rounded={"2xl"}
                    mb={2}
                >
                    <Image minHeight="280" src={imageUrl}></Image>

                    <Button
                        _hover={{
                            color: is_owner ? "yellow.400" : "red.400",
                        }}
                        variant={"unstyled"}
                        cursor={"pointer"}
                        color="white"
                        position={"absolute"}
                        top={0}
                        right={0}
                        onClick={onEditClick}
                    >
                        {is_owner ? (
                            <FaPencilAlt size={"20px"} />
                        ) : (
                            <FaRegHeart size={"20px"} />
                        )}
                    </Button>
                </Box>

                {/* <Grid gap={2} templateColumns={"10fr 1fr"}> */}
                <Box>
                    <HStack w={"100%"} justifyContent={"space-between"}>
                        <Box w={"90%"}>
                            <Text
                                display={"block"}
                                as="b"
                                noOfLines={1}
                                fontSize={"md"}
                            >
                                {name}
                            </Text>
                        </Box>

                        <Box>
                            <HStack
                                _hover={{
                                    color: "yellow.400",
                                }}
                                spacing={1}
                                alignItems={"center"}
                            >
                                <FaStar size={12}></FaStar>
                                <Text>{room_rate}</Text>
                            </HStack>
                        </Box>
                    </HStack>
                    <Text fontSize={"sm"}>
                        {city}, {country}
                    </Text>
                </Box>
                {/* </Grid> */}

                <Text fontSize={"sm"} color={"gary.600"}>
                    <Text as={"b"}>₩{numberWithCommas(price)}</Text> / night
                </Text>
            </VStack>
        </Link>
    );
}
