import { Grid } from "@chakra-ui/react";
import Room from "../components/Room";
import { useEffect, useState } from "react";
import axios from "axios";
import RoomSkeleton from "../components/RoomSkeleton";
import { useQuery } from "react-query";
import { getRooms } from "../Api";

interface IPhotoSet {
    file: string;
    description: string;
}

interface IRoom {
    pk: number;
    name: string;
    country: string;
    city: string;
    price: number;
    room_rate: number;
    is_owner: boolean;
    photo_set: IPhotoSet[];
}

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
