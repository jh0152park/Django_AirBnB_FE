import {
    Box,
    Button,
    Container,
    FormControl,
    Heading,
    Input,
    VStack,
} from "@chakra-ui/react";
import HostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function UploadPhotos() {
    const { roomPk } = useParams();
    const { register, handleSubmit, watch } = useForm();

    console.log(roomPk);
    console.log(watch());

    return (
        <ProtectedPage>
            <HostOnlyPage>
                <Box
                    mt={10}
                    pb={10}
                    px={{
                        base: 10,
                        lg: 40,
                    }}
                >
                    <Container>
                        <Heading textAlign={"center"}>Upload a Photos</Heading>
                        <VStack>
                            <FormControl my={5}>
                                <Input
                                    {...register("file")}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                ></Input>
                            </FormControl>
                            <Button colorScheme="red" w={"100%"}>
                                Upload Photos
                            </Button>
                        </VStack>
                    </Container>
                </Box>
            </HostOnlyPage>
        </ProtectedPage>
    );
}
