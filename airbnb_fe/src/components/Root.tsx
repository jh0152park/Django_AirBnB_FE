import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <h1>
            Im Root!
            <Outlet></Outlet>
        </h1>
    );
}
