import Room from "../components/Room";
import RoomSkeleton from "../components/RoomSkeleton";
import { Grid } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getRooms } from "../Api";

export default function Home() {
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
                    <RoomSkeleton></RoomSkeleton>
                    <RoomSkeleton></RoomSkeleton>
                    <RoomSkeleton></RoomSkeleton>
                    <RoomSkeleton></RoomSkeleton>
                    <RoomSkeleton></RoomSkeleton>
                    <RoomSkeleton></RoomSkeleton>
                    <RoomSkeleton></RoomSkeleton>
                    <RoomSkeleton></RoomSkeleton>
                    <RoomSkeleton></RoomSkeleton>
                </>
            ) : null}

            {rooms?.map((room) => (
                <Room
                    pk={room.pk}
                    imageUrl={room.photo_set[0].file}
                    name={room.name}
                    room_rate={room.room_rate}
                    price={room.price}
                    city={room.city}
                    country={room.country}
                ></Room>
            ))}
        </Grid>
    );
}
