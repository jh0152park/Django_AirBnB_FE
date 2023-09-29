import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
// import Users from "./routes/Users";
import NotFound from "./routes/NotFound";
import RoomDetail from "./routes/RoomDetail";
import GithubConfirm from "./routes/GithubConfirm";
import KakaoConfirm from "./routes/KakaoConfirm";
import UploadRoom from "./routes/UploadRoom";
import UploadPhotos from "./routes/UploadPhotos";
import EditRoom from "./routes/EditRoom";
import MyPages from "./routes/MyPages";
// import path from "path";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "rooms/upload",
                element: <UploadRoom />,
            },
            {
                path: "rooms/:roomPk",
                element: <RoomDetail />,
            },
            {
                path: "rooms/:roomPk/photos",
                element: <UploadPhotos />,
            },
            {
                path: "rooms/:roomPk/edit",
                element: <EditRoom />,
            },
            {
                path: ":username/mypages",
                element: <MyPages />,
            },
            {
                path: "social",
                children: [
                    {
                        path: "github",
                        element: <GithubConfirm />,
                    },
                    {
                        path: "kakao",
                        element: <KakaoConfirm />,
                    },
                ],
            },
        ],
    },
]);

export default router;
