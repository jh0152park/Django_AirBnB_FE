import HostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";

export default function UploadRoom() {
    return (
        <ProtectedPage>
            <HostOnlyPage>
                <h1>Upload Room</h1>
            </HostOnlyPage>
        </ProtectedPage>
    );
}
