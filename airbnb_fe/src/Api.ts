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

export async function githubLogin({ code }: { code: string }) {
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

export async function kakaoLogin({ code }: { code: string }) {
    const res = await axiosInstance.post(
        `users/kakao`,
        { code },
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        }
    );
    return res.status;
}

export async function usernameLogIn({
    username,
    password,
}: IUsernameLogInVariables) {
    const res = await axiosInstance.post(
        `users/log-in`,
        { username, password },
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        }
    );
    return res.data;
}

export async function signUpUser({
    name,
    username,
    email,
    password,
}: ISignUpVariables) {
    const res = await axiosInstance.post(
        `users/create`,
        { name, username, email, password },
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        }
    );
    return res.data;
}

export async function getAmenities() {
    const res = await axiosInstance.get("rooms/amenities/");
    return res.data;
}

export async function getCategories() {
    const res = await axiosInstance.get("categories/");
    return res.data;
}

export async function uploadRoom(variables: IRoomForm) {
    const res = await axiosInstance.post(`rooms/`, variables, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    });
    return res.data;
}
