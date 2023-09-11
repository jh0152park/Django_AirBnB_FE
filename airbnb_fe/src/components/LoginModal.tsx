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

interface LoginModelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModelProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay></ModalOverlay>
            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
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
                                placeholder="Username"
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
                        Log in
                    </Button>

                    <SocialLogin></SocialLogin>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
