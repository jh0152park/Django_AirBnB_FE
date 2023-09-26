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
import { getAmenities, getCategories, getRoom, uploadRoom } from "../Api";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function EditRoom() {
    const { roomPk } = useParams();
    const { register, handleSubmit, reset } = useForm<IRoomForm>();
    const Amenities = useQuery<IAmenity[]>(["amenities"], getAmenities);
    const Categories = useQuery<ICategory[]>(["categories"], getCategories);
    const { isLoading, data } = useQuery<IRoomDetail>(
        ["roomEdit", roomPk],
        getRoom
    );

    let currentAmenities: number[] = [];

    if (Amenities.data && data) {
        data.amenity.map((amenity) => currentAmenities.push(amenity.pk));
    }

    // const toast = useToast();
    // const navigate = useNavigate();
    // const mutation = useMutation(uploadRoom, {
    //     onMutate: () => {
    //         console.log("start mutation");
    //     },
    //     onSuccess: (data: IRoomForm) => {
    //         toast({
    //             status: "success",
    //             title: "Upload Room Success!",
    //         });
    //         reset();
    //         navigate(`/rooms/${data.id}`);
    //     },
    // });

    // function onSubmit(data: IRoomForm) {
    //     mutation.mutate(data);
    // }

    return (
        <>
            {isLoading ? null : (
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
                                <Heading textAlign={"center"}>
                                    Edit Room
                                </Heading>
                                <VStack
                                    spacing={10}
                                    as={"form"}
                                    mt={5}
                                    // onSubmit={handleSubmit(onSubmit)}
                                >
                                    <FormControl>
                                        <FormLabel>Name</FormLabel>
                                        <Input
                                            {...register("name", {
                                                required: true,
                                            })}
                                            required
                                            type="text"
                                            value={data?.name}
                                        ></Input>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Country</FormLabel>
                                        <Input
                                            {...register("country", {
                                                required: true,
                                            })}
                                            required
                                            type="text"
                                            value={data?.country}
                                        ></Input>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>City</FormLabel>
                                        <Input
                                            {...register("city", {
                                                required: true,
                                            })}
                                            required
                                            type="text"
                                            value={data?.city}
                                        ></Input>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Address</FormLabel>
                                        <Input
                                            {...register("address", {
                                                required: true,
                                            })}
                                            required
                                            type="text"
                                            value={data?.address}
                                        ></Input>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Price</FormLabel>
                                        <InputGroup>
                                            <InputLeftAddon
                                                children={
                                                    <FaDollarSign></FaDollarSign>
                                                }
                                            ></InputLeftAddon>
                                            <Input
                                                {...register("price", {
                                                    required: true,
                                                })}
                                                required
                                                type="number"
                                                min={0}
                                                value={data?.price + ""}
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
                                                value={data?.rooms + ""}
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
                                                value={data?.toilets + ""}
                                            ></Input>
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Description</FormLabel>
                                        <Textarea
                                            {...register("description", {
                                                required: true,
                                            })}
                                            value={data?.description}
                                        ></Textarea>
                                    </FormControl>
                                    <FormControl>
                                        <Checkbox
                                            {...register("pet_allow", {
                                                required: true,
                                            })}
                                            isChecked={data?.pet_allow}
                                        >
                                            Pets Allowed?
                                        </Checkbox>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Kink of Room</FormLabel>
                                        <Select
                                            placeholder={data?.kind}
                                            {...register("kind", {
                                                required: true,
                                            })}
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
                                            placeholder={data?.category.name}
                                            {...register("category", {
                                                required: true,
                                            })}
                                        >
                                            {Categories.data?.map(
                                                (category) => (
                                                    <option
                                                        value={category.pk}
                                                        key={category.pk}
                                                    >
                                                        {category.name}
                                                    </option>
                                                )
                                            )}
                                        </Select>
                                        <FormHelperText>
                                            What category describes your room?
                                        </FormHelperText>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Amenities</FormLabel>
                                        <Grid
                                            templateColumns={"1fr 1fr"}
                                            gap={5}
                                        >
                                            {Amenities.data?.map((amenity) => (
                                                <Box key={amenity.pk}>
                                                    <Checkbox
                                                        isChecked={currentAmenities.includes(
                                                            amenity.pk
                                                        )}
                                                        value={amenity.pk}
                                                        {...register(
                                                            "amenity",
                                                            {
                                                                required: true,
                                                            }
                                                        )}
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
                                    {/* {mutation.isError ? (
                                <Text color={"red.500"}>
                                    Something went wrong
                                </Text>
                            ) : null} */}
                                    <Button
                                        type="submit"
                                        colorScheme={"red"}
                                        size={"lg"}
                                        w="100%"
                                        // isLoading={mutation.isLoading}
                                    >
                                        Edit Room
                                    </Button>
                                </VStack>
                            </Container>
                        </Box>
                    </HostOnlyPage>
                </ProtectedPage>
            )}
        </>
    );
}
