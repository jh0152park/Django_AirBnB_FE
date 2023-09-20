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
    ToastId,
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
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import React, { useRef } from "react";

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
    const toastId = useRef<ToastId>();

    // eslint-disable-next-line
    const { colorMode, toggleColorMode } = useColorMode();
    const { userLoading, user, isLooggedIn } = useUser();

    const logoColor = useColorModeValue("red.500", "red.200");
    const Icon = useColorModeValue(<FaMoon />, <BsSunFill />);
    const queryClient = useQueryClient();

    const mutation = useMutation(logOut, {
        onMutate: () => {
            console.log("Logout mutation start.");
            toastId.current = toast({
                title: "Login out...",
                description: "Try to log out",
                status: "loading",
            });
        },

        onSuccess: () => {
            if (toastId.current) {
                toast.update(toastId.current, {
                    title: "Log out successed",
                    description: "Good bye!",
                    status: "success",
                });
                queryClient.refetchQueries(["me"]);
            }
        },
    });

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
                                {user?.is_host ? (
                                    <Link to="/rooms/upload">
                                        <MenuItem>Upload New Room</MenuItem>
                                    </Link>
                                ) : null}

                                <MenuItem onClick={() => mutation.mutate()}>
                                    Logout
                                </MenuItem>
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
