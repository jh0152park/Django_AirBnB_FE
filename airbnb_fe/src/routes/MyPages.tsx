import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import useUser from "../lib/useUser";
import { useQuery } from "react-query";
import { getMyReservation, getMyRoomBookings } from "../Api";

export default function MyPages() {
    const { userLoading, user, isLooggedIn } = useUser();
    const { isLoading, data } = useQuery<IReservationForm[]>(
        ["myReservation"],
        getMyReservation
    );
    const { isLoading: roomReservationLoading, data: roomReservationData } =
        useQuery(["myRoomReservation", user?.username], getMyRoomBookings);

    let roomReservation: IReservationForm[] = [];
    let experienceReservation: IReservationForm[] = [];
    let myRoomReservation: IMyRoomReservationForm[] = [];

    if (data) {
        data.map((reserved) => {
            if (reserved.room !== null) {
                roomReservation.push(reserved);
            } else if (
                reserved.experience !== null &&
                reserved.experience_time !== null
            ) {
                experienceReservation.push(reserved);
            }
        });

        // console.log("room reservation");
        // console.log(roomReservation);
        // console.log("experience reservation");
        // console.log(experienceReservation);
    }

    if (roomReservationData) {
        // console.log(JSON.parse(roomReservationData.reservation));
        // JSON.parse(roomReservationData.reservation).map((reserved: any) =>
        //     console.log(reserved)
        // );
        //console.log(JSON.parse(roomReservationData.reservation));
        // JSON.parse(roomReservationData.reservation).map((res: any) =>
        //     console.log(res)
        // );
        myRoomReservation = JSON.parse(roomReservationData.reservation);
    }

    console.log(myRoomReservation);

    return (
        <>
            {!isLoading && !userLoading && data ? (
                <Container>
                    <VStack my={5}>
                        <Heading mb={5}>Room Reservataion</Heading>
                        {roomReservation.map((reserved, index) => (
                            <VStack
                                key={index}
                                border={"1px"}
                                p={2}
                                my={2}
                                alignItems={"flex-start"}
                            >
                                <Text>Room: {reserved.room?.name}</Text>
                                <Text>Check In: {reserved.check_in_date}</Text>
                                <Text>
                                    Check Out: {reserved.check_out_date}
                                </Text>
                                <Text>Gueests: {reserved.guests}</Text>
                            </VStack>
                        ))}
                        <Heading>Experience Reservataion</Heading>
                        {experienceReservation.map((reserved, index) => (
                            <VStack
                                key={index}
                                border={"1px"}
                                p={2}
                                my={2}
                                alignItems={"flex-start"}
                            >
                                <Text>
                                    Experience: {reserved.experience?.name}
                                </Text>
                                <Text>
                                    Time:{" "}
                                    {reserved.experience_time.split("T")[0]}_
                                    {
                                        reserved.experience_time
                                            .split("T")[1]
                                            .split("+")[0]
                                    }
                                </Text>
                                <Text>Gueests: {reserved.guests}</Text>
                            </VStack>
                        ))}
                        {user?.is_host &&
                        !roomReservationLoading &&
                        roomReservationData ? (
                            <>
                                <Heading>My host room reserved list</Heading>
                                {myRoomReservation.map((res, index) => (
                                    <VStack
                                        key={index}
                                        border={"1px"}
                                        p={2}
                                        my={2}
                                        alignItems={"flex-start"}
                                    >
                                        <Text>Room: {res.room}</Text>
                                        {res.reservations.map(
                                            (detail, index) => (
                                                <Box
                                                    key={index}
                                                    border={"1px"}
                                                    p={2}
                                                    my={2}
                                                >
                                                    <Text>
                                                        Reservation:{" "}
                                                        {detail.user}
                                                    </Text>
                                                    <Text>
                                                        Guests: {detail.guests}
                                                    </Text>
                                                    <Text>
                                                        Check In:{" "}
                                                        {detail.check_in}
                                                    </Text>
                                                    <Text>
                                                        Check Out:{" "}
                                                        {detail.check_out}
                                                    </Text>
                                                </Box>
                                            )
                                        )}
                                    </VStack>
                                ))}
                            </>
                        ) : null}
                    </VStack>
                </Container>
            ) : null}
        </>
    );
}
