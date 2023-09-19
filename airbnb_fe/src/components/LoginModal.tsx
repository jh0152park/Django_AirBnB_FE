import {
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
    useToast,
} from "@chakra-ui/react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { usernameLogIn } from "../Api";

interface LoginModelProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ILoginForm {
    username: string;
    password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModelProps) {
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ILoginForm>();

    const toast = useToast();
    const queryClient = useQueryClient();

    const mutation = useMutation<
        IUsernameLogInSuccess,
        IUsernameLogInFail,
        IUsernameLogInVariables
    >(usernameLogIn, {
        onMutate: () => {
            console.log("Mutation start.");
        },
        onSuccess: (result) => {
            console.log("Mutation succeeded.");
            console.log(result.login_success);
            toast({
                title: "Welcome!",
                description: "Login successed",
                status: "success",
            });
            onClose();
            queryClient.refetchQueries(["me"]);
        },
        onError: (result) => {
            console.log(result.login_success);
            console.log("Mutation failed.");
            toast({
                title: "Occurred error!",
                description: "Login failed",
                status: "error",
            });
        },
    });

    function usernameSubmit({ username, password }: ILoginForm) {
        setValue("username", "");
        setValue("password", "");
        mutation.mutate({ username, password });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay></ModalOverlay>
            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
                <ModalCloseButton></ModalCloseButton>
                <ModalBody as={"form"} onSubmit={handleSubmit(usernameSubmit)}>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color={"gray.500"}>
                                        <FaUserAlt />
                                    </Box>
                                }
                            ></InputLeftElement>
                            <Input
                                {...register("username", {
                                    required: "Username is necessary!",
                                })}
                                isInvalid={Boolean(errors.username?.message)}
                                variant={"filled"}
                                placeholder="Username"
                                required
                            ></Input>
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color={"gray.500"}>
                                        <FaLock />
                                    </Box>
                                }
                            ></InputLeftElement>
                            <Input
                                {...register("password", {
                                    required: "Password is necessary!",
                                })}
                                isInvalid={Boolean(errors.password?.message)}
                                variant={"filled"}
                                placeholder="Password"
                                required
                            ></Input>
                        </InputGroup>
                    </VStack>

                    <Button
                        mt={4}
                        w="100%"
                        colorScheme="red"
                        type="submit"
                        isLoading={mutation.isLoading}
                    >
                        Log in
                    </Button>

                    <SocialLogin></SocialLogin>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
