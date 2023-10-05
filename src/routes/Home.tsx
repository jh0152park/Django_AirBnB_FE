import Room from "../components/Room";
import RoomSkeleton from "../components/RoomSkeleton";
import { Box, Grid } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getRooms } from "../Api";

export default function Home() {
    const dummyImageUrl =
        "https://images.unsplash.com/photo-1558481795-7f0a7c906f5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1496&q=80";
    const { isLoading, data: rooms } = useQuery<IRoom[]>(["rooms"], getRooms);

    return (
        <Grid
            px={{
                base: 10,
                lg: 20,
            }}
            mt={10}
            columnGap={4}
            rowGap={8}
            templateColumns={{
                sm: "1fr",
                md: "1fr 1fr",
                lg: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
                "2xl": "repeat(5, 1fr)",
            }}
        >
            {isLoading ? (
                <>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((dummy) => (
                        <Box key={dummy}>
                            <RoomSkeleton></RoomSkeleton>
                        </Box>
                    ))}
                </>
            ) : null}

            {rooms?.map((room, index) => (
                <Room
                    key={index}
                    pk={room.pk}
                    imageUrl={
                        room.photo_set[0]
                            ? room.photo_set[0].file
                            : dummyImageUrl
                    }
                    name={room.name}
                    room_rate={room.room_rate}
                    price={room.price}
                    city={room.city}
                    country={room.country}
                    is_owner={room.is_owner}
                ></Room>
            ))}
        </Grid>
    );
}
