import Cookie from "js-cookie";
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
    // eslint-disable-next-line
    const [_, roomPk] = queryKey;
    const res = await axiosInstance.get(`rooms/${roomPk}`);
    return res.data;
}

export async function getRoomReviews({ queryKey }: QueryFunctionContext) {
    // eslint-disable-next-line
    const [_, roomPk] = queryKey;
    const res = await axiosInstance.get(`rooms/${roomPk}/reviews`);
    return res.data;
}

export async function getMe() {
    const res = await axiosInstance.get(`users/me`);
    return res.data;
}

export async function logOut() {
    const res = await axiosInstance.post(`users/log-out`, null, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    });
    return res.data;
}

export async function githubLogin(code: string) {
    const res = await axiosInstance.post(
        `users/github`,
        { code },
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        }
    );
    return res.status;
}
