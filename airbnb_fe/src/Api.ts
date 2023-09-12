import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
});

export async function getRooms() {
    const res = await axiosInstance.get("rooms/");
    return res.data;
}
