import axios from "axios";
import { QueryFunctionContext } from "react-query";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
    withCredentials: true,
});

export async function getRooms() {
    const res = await axiosInstance.get("rooms/");
    return res.data;
}

export async function getRoom({ queryKey }: QueryFunctionContext) {
    const [_, roomPk] = queryKey;
    const res = await axiosInstance.get(`rooms/${roomPk}`);
    return res.data;
}

export async function getRoomReviews({ queryKey }: QueryFunctionContext) {
    const [_, roomPk] = queryKey;
    const res = await axiosInstance.get(`rooms/${roomPk}/reviews`);
    return res.data;
}

export async function getMe() {
    const res = await axiosInstance.get(`users/me`);
    return res.data;
}

export async function logOut() {
    const res = await axiosInstance.post(`users/log-out`);
    return res.data;
}
