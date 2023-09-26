import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    Select,
    Text,
    Textarea,
    VStack,
    useToast,
} from "@chakra-ui/react";
import HostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { FaBed, FaDollarSign, FaToilet } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import { getAmenities, getCategories, uploadRoom } from "../Api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function UploadRoom() {
    const { register, handleSubmit, reset } = useForm<IRoomForm>();
    const Amenities = useQuery<IAmenity[]>(["amenities"], getAmenities);
    const Categories = useQuery<ICategory[]>(["categories"], getCategories);

    const toast = useToast();
    const navigate = useNavigate();
    const mutation = useMutation(uploadRoom, {
        onMutate: () => {
            console.log("start mutation");
        },
        onSuccess: () => {
            toast({
                status: "success",
                title: "Upload Room Success!",
            });
            reset();
            navigate("/");
            // navigate(`/rooms/${data.id}`);
        },
    });

    function onSubmit(data: IRoomForm) {
        mutation.mutate(data);
    }

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
                        <VStack
                            spacing={10}
                            as={"form"}
                            mt={5}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    {...register("name", { required: true })}
                                    required
                                    type="text"
                                    placeholder="Name of your room"
                                ></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Country</FormLabel>
                                <Input
                                    {...register("country", { required: true })}
                                    required
                                    type="text"
                                    placeholder="Country where your room at"
                                ></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel>City</FormLabel>
                                <Input
                                    {...register("city", { required: true })}
                                    required
                                    type="text"
                                    placeholder="City where your room at"
                                ></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Address</FormLabel>
                                <Input
                                    {...register("address", { required: true })}
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
                                        {...register("price", {
                                            required: true,
                                        })}
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
                                        {...register("rooms", {
                                            required: true,
                                        })}
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
                                        {...register("toilets", {
                                            required: true,
                                        })}
                                        required
                                        type="number"
                                        min={0}
                                        placeholder="How many toilets you has"
                                    ></Input>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    {...register("description", {
                                        required: true,
                                    })}
                                ></Textarea>
                            </FormControl>
                            <FormControl>
                                <Checkbox {...register("pet_allow")}>
                                    Pets Allowed?
                                </Checkbox>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Kink of Room</FormLabel>
                                <Select
                                    placeholder="Chooes a kind"
                                    {...register("kind", { required: true })}
                                >
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
                            <FormControl>
                                <FormLabel>Category of Room</FormLabel>
                                <Select
                                    placeholder="Chooes a category"
                                    {...register("category", {
                                        required: true,
                                    })}
                                >
                                    {Categories.data?.map((category) => (
                                        <option
                                            value={category.pk}
                                            key={category.pk}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </Select>
                                <FormHelperText>
                                    What category describes your room?
                                </FormHelperText>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Amenities</FormLabel>
                                <Grid templateColumns={"1fr 1fr"} gap={5}>
                                    {Amenities.data?.map((amenity) => (
                                        <Box key={amenity.pk}>
                                            <Checkbox
                                                value={amenity.pk}
                                                {...register("amenity", {
                                                    required: true,
                                                })}
                                            >
                                                {amenity.name}
                                            </Checkbox>
                                            <FormHelperText>
                                                {amenity.description}
                                            </FormHelperText>
                                        </Box>
                                    ))}
                                </Grid>
                            </FormControl>
                            {mutation.isError ? (
                                <Text color={"red.500"}>
                                    Something went wrong
                                </Text>
                            ) : null}
                            <Button
                                type="submit"
                                colorScheme={"red"}
                                size={"lg"}
                                w="100%"
                                isLoading={mutation.isLoading}
                            >
                                Upload Room
                            </Button>
                        </VStack>
                    </Container>
                </Box>
            </HostOnlyPage>
        </ProtectedPage>
    );
}
