import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getRoom } from "../Api";

export default function RoomDetail() {
    const { roomPk } = useParams();

    const { isLoading, data } = useQuery(["room", roomPk], () =>
        getRoom(roomPk as string)
    );
    console.log(data);
    return <h1>Hello!</h1>;
}
