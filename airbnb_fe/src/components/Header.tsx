import {
    Box,
    Button,
    HStack,
    IconButton,
    LightMode,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
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

    const { colorMode, toggleColorMode } = useColorMode();
    const logoColor = useColorModeValue("red.500", "red.200");
    const Icon = useColorModeValue(<FaMoon />, <BsSunFill />);

    return (
        <HStack
            py={5}
            px={10}
            borderBottomWidth={1}
            justifyContent={"space-between"}
        >
            <Box color={logoColor}>
                <FaAirbnb size={"48"}></FaAirbnb>
            </Box>

            <HStack spacing={2}>
                <IconButton
                    onClick={toggleColorMode}
                    variant={"ghost"}
                    aria-label="Toggle Dark Mode"
                    icon={Icon}
                ></IconButton>
                <Button onClick={OnLoginOpen}>Log in</Button>
                <LightMode>
                    <Button onClick={OnSingupOpen} colorScheme="red">
                        Sign up
                    </Button>
                </LightMode>
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
