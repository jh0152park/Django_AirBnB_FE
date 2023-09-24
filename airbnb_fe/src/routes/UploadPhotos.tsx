import {
    Box,
    Button,
    Container,
    FormControl,
    FormHelperText,
    Heading,
    Image,
    Input,
    Textarea,
    VStack,
    useToast,
} from "@chakra-ui/react";
import HostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "react-query";
import { UploadPhotoImage } from "../Api";

export default function UploadPhotos() {
    const { roomPk } = useParams();
    const { register, handleSubmit, watch } = useForm();
    const toast = useToast();
    const navigate = useNavigate();

    const mutation = useMutation(UploadPhotoImage, {
        onMutate: () => {
            console.log("start on mutate");
            // toast({
            //     status: "loading",
            //     title: "Uploading...",
            // });
        },

        onSuccess: () => {
            console.log("upload photo success");
            toast({
                status: "success",
                title: "Success!",
            });
            navigate("/");
        },
    });

    function fileUploadSubmit() {
        if (roomPk && watch("file") && watch("description")) {
            const file = watch("file");
            const description = watch("description");
            mutation.mutate({ roomPk, file, description });
        }
    }

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
                    <Container
                        as={"form"}
                        onSubmit={handleSubmit(fileUploadSubmit)}
                    >
                        <Heading textAlign={"center"}>Upload a Photo</Heading>
                        <VStack>
                            <FormControl my={5}>
                                <Input
                                    {...register("file", { required: true })}
                                    type="text"
                                    placeholder="Please enter a url of image file here."
                                ></Input>
                                <Textarea
                                    mt={5}
                                    {...register("description", {
                                        required: true,
                                    })}
                                    placeholder="Please write some description of the image."
                                ></Textarea>
                            </FormControl>
                            <Button
                                colorScheme="red"
                                w={"100%"}
                                type="submit"
                                isLoading={mutation.isLoading}
                            >
                                Upload Photo URL
                            </Button>
                        </VStack>
                    </Container>
                </Box>
            </HostOnlyPage>
        </ProtectedPage>
    );
}
