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
} from "@chakra-ui/react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

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

    function usernameSubmit(data: ILoginForm) {
        setValue("username", "");
        setValue("password", "");
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
                            {/* <Text fontSize={"sm"} color={"red.500"}>
                                {errors.username?.message}
                            </Text> */}
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
                            {/* <Text fontSize={"sm"} color={"red.500"}>
                                {errors.password?.message}
                            </Text> */}
                        </InputGroup>
                    </VStack>

                    <Button mt={4} w="100%" colorScheme="red" type="submit">
                        Log in
                    </Button>

                    <SocialLogin></SocialLogin>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
