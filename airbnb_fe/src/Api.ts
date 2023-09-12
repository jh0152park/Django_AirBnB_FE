import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/v1";

export async function getRooms() {
    const res = await axios.get(BASE_URL + "/rooms/");
    return res.data;
}
