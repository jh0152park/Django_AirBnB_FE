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
import { FaEnvelope, FaLock, FaUserAlt, FaUserSecret } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

interface SignupModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay></ModalOverlay>
            <ModalContent>
                <ModalHeader>Sign up</ModalHeader>
                <ModalCloseButton></ModalCloseButton>
                <ModalBody>
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
                                variant={"filled"}
                                placeholder="Name"
                            ></Input>
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color={"gray.500"}>
                                        <FaUserSecret />
                                    </Box>
                                }
                            ></InputLeftElement>
                            <Input
                                variant={"filled"}
                                placeholder="Username"
                            ></Input>
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color={"gray.500"}>
                                        <FaEnvelope />
                                    </Box>
                                }
                            ></InputLeftElement>
                            <Input
                                variant={"filled"}
                                placeholder="Email"
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
                            ></Input>
                        </InputGroup>
                    </VStack>

                    <Button mt={4} w="100%" colorScheme="red">
                        Sign up
                    </Button>

                    <SocialLogin></SocialLogin>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
