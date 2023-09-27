import Cookie from "js-cookie";
import axios from "axios";
import { QueryFunctionContext } from "react-query";
import { formAtDate } from "./lib/utils";

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

export async function UploadPhotoImage({
    roomPk,
    file,
    description,
}: IUproadRoomPhotoVariables) {
    const res = await axiosInstance.post(
        `rooms/${roomPk}/photos`,
        { file, description },
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        }
    );
    return res.data;
}

type CheckBookingQeuryKey = [string, Date[]?, string?];

export async function checkBooingPossible({
    queryKey,
}: QueryFunctionContext<CheckBookingQeuryKey>) {
    const [_, dates, roomPk] = queryKey;

    if (dates) {
        const [first, second] = dates;
        const checkIn = formAtDate(first);
        const checkOut = formAtDate(second);

        console.log(checkIn, checkOut);

        const res = await axiosInstance.get(
            `rooms/${roomPk}/bookings/check?check_in=${checkIn}&check_out=${checkOut}`
        );
        return res.data;
    }
}

interface IEditRoomForm {
    roomPk: string;
    data: IEditRoomForm;
}

export async function editRoom({ roomPk, data }: IEditRoomForm) {
    console.log("edit room function called");
    console.log(data);
    console.log(roomPk);

    const res = await axiosInstance.put(`rooms/${roomPk}`, data, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    });
    return res.data;
}
