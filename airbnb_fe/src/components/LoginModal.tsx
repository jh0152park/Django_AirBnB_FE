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

export default function LoginModal({ isOpen, onClose }: LoginModelProps) {
    // const { register, setValue, handleSubmit } = useForm();
    const usernameForm = useForm();

    function usernameSubmit() {
        usernameForm.setValue("username", "");
    }

    useEffect(() => {
        console.log(usernameForm.getValues("username"));
    }, [usernameForm.watch("username")]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay></ModalOverlay>
            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
                <ModalCloseButton></ModalCloseButton>
                <ModalBody
                    as={"form"}
                    onSubmit={usernameForm.handleSubmit(usernameSubmit)}
                >
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
                                {...usernameForm.register("username", {
                                    required: "Please, let me know your name!",
                                })}
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
                                variant={"filled"}
                                placeholder="Password"
                                required
                            ></Input>
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
