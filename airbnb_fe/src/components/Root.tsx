import {
    Box,
    Button,
    HStack,
    IconButton,
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
    useDisclosure,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { FaAirbnb, FaMoon, FaUserAlt, FaLock } from "react-icons/fa";

export default function Root() {
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <Box>
            <HStack
                py={5}
                px={10}
                borderBottomWidth={1}
                justifyContent={"space-between"}
            >
                <Box color={"red.500"}>
                    <FaAirbnb size={"48"}></FaAirbnb>
                </Box>

                <HStack spacing={2}>
                    <IconButton
                        variant={"ghost"}
                        aria-label="Toggle Dark Mode"
                        icon={<FaMoon />}
                    ></IconButton>
                    <Button onClick={onOpen}>Log in</Button>
                    <Button colorScheme="red">Sign up</Button>
                </HStack>

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
                                <Button mt={4} w="100%" colorScheme="red">
                                    Log in
                                </Button>
                            </VStack>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </HStack>
            <Outlet></Outlet>
        </Box>
    );
}
