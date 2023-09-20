import {
    Box,
    Checkbox,
    Container,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    Select,
    Textarea,
    VStack,
} from "@chakra-ui/react";
import HostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { FaBed, FaDollarSign, FaToilet } from "react-icons/fa";

export default function UploadRoom() {
    return (
        <ProtectedPage>
            <HostOnlyPage>
                <Box
                    pb={40}
                    mt={10}
                    px={{
                        base: 10,
                        lg: 40,
                    }}
                >
                    <Container>
                        <Heading textAlign={"center"}>Upload Room</Heading>
                        <VStack spacing={5} as={"form"} mt={5}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    required
                                    type="text"
                                    placeholder="Name of your room"
                                ></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Country</FormLabel>
                                <Input
                                    required
                                    type="text"
                                    placeholder="Country where your room at"
                                ></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel>City</FormLabel>
                                <Input
                                    required
                                    type="text"
                                    placeholder="City where your room at"
                                ></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Address</FormLabel>
                                <Input
                                    required
                                    type="text"
                                    placeholder="Address where your room at"
                                ></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Price</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon
                                        children={<FaDollarSign></FaDollarSign>}
                                    ></InputLeftAddon>
                                    <Input
                                        required
                                        type="number"
                                        min={0}
                                        placeholder="Price per night"
                                    ></Input>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Rooms</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon
                                        children={<FaBed></FaBed>}
                                    ></InputLeftAddon>
                                    <Input
                                        required
                                        type="number"
                                        min={0}
                                        placeholder="How many rooms you has"
                                    ></Input>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Toilets</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon
                                        children={<FaToilet></FaToilet>}
                                    ></InputLeftAddon>
                                    <Input
                                        required
                                        type="number"
                                        min={0}
                                        placeholder="How many toilets you has"
                                    ></Input>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Textarea></Textarea>
                            </FormControl>
                            <FormControl>
                                <Checkbox>Pets Allowed?</Checkbox>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Category of Room</FormLabel>
                                <Select placeholder="Chooes a category">
                                    <option value="entire_place">
                                        Entire Place
                                    </option>
                                    <option value="private_rooms">
                                        Private Room
                                    </option>
                                    <option value="shared_rooms">
                                        Shared Room
                                    </option>
                                </Select>
                                <FormHelperText>
                                    What kind of room are you renting?
                                </FormHelperText>
                            </FormControl>
                        </VStack>
                    </Container>
                </Box>
            </HostOnlyPage>
        </ProtectedPage>
    );
}
