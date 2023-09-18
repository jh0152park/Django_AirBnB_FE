import {
    Avatar,
    Box,
    Button,
    HStack,
    IconButton,
    LightMode,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import useUser from "../lib/useUser";
import { logOut } from "../Api";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import React from "react";

function Header() {
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

    const toast = useToast();

    // eslint-disable-next-line
    const { colorMode, toggleColorMode } = useColorMode();
    const logoColor = useColorModeValue("red.500", "red.200");
    const Icon = useColorModeValue(<FaMoon />, <BsSunFill />);
    const { userLoading, user, isLooggedIn } = useUser();
    const queryClient = useQueryClient();

    console.log("render header");

    async function onLogOut() {
        const toastId = toast({
            title: "Login out...",
            description: "Try to log out",
            status: "loading",
        });

        await logOut();

        setTimeout(() => {
            toast.update(toastId, {
                title: "Log out successed",
                description: "Good bye!",
                status: "success",
            });
            queryClient.refetchQueries(["me"]);
        }, 2000);
    }

    return (
        <Stack
            py={5}
            px={20}
            borderBottomWidth={1}
            justifyContent={"space-between"}
            direction={{
                sm: "column",
                md: "row",
            }}
            alignItems={"center"}
            spacing={{
                sm: 4,
                md: 0,
            }}
        >
            <Box color={logoColor}>
                <Link to="/">
                    <FaAirbnb size={"48"}></FaAirbnb>
                </Link>
            </Box>

            <HStack spacing={2}>
                <IconButton
                    onClick={toggleColorMode}
                    variant={"ghost"}
                    aria-label="Toggle Dark Mode"
                    icon={Icon}
                ></IconButton>
                {!userLoading ? (
                    !isLooggedIn ? (
                        <>
                            <Button onClick={OnLoginOpen}>Log in</Button>
                            <LightMode>
                                <Button
                                    onClick={OnSingupOpen}
                                    colorScheme="red"
                                >
                                    Sign up
                                </Button>
                            </LightMode>
                        </>
                    ) : (
                        <Menu>
                            <MenuButton>
                                <Avatar
                                    size={"md"}
                                    name={user?.name}
                                    src={user?.profile_picture}
                                ></Avatar>
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={onLogOut}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    )
                ) : null}
            </HStack>

            <LoginModal
                isOpen={isLoginOpen}
                onClose={OnLoginClose}
            ></LoginModal>

            <SignupModal
                isOpen={isSingupOpen}
                onClose={OnSingupClose}
            ></SignupModal>
        </Stack>
    );
}

export default React.memo(Header);
