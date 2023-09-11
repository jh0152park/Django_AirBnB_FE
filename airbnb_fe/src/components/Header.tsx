import {
    Box,
    Button,
    HStack,
    IconButton,
    useDisclosure,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

export default function Header() {
    const {
        isOpen: isLoginOpen,
        onClose: OnLoginClose,
        onOpen: OnLoginOpen,
    } = useDisclosure();
    const {
        isOpen: isSingupOpen,
        onClose: OnSingupClose,
        onOpen: OnSingupOpen,
    } = useDisclosure();

    return (
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
                <Button onClick={OnLoginOpen}>Log in</Button>
                <Button onClick={OnSingupOpen} colorScheme="red">
                    Sign up
                </Button>
            </HStack>

            <LoginModal
                isOpen={isLoginOpen}
                onClose={OnLoginClose}
            ></LoginModal>
            <SignupModal
                isOpen={isSingupOpen}
                onClose={OnSingupClose}
            ></SignupModal>
        </HStack>
    );
}
