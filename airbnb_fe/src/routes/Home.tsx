import {
    Box,
    Button,
    Grid,
    HStack,
    Heading,
    Image,
    Skeleton,
    SkeletonText,
    Text,
    VStack,
} from "@chakra-ui/react";
import Room from "../components/Room";

export default function Home() {
    return (
        <Grid
            px={{
                base: 10,
                lg: 20,
            }}
            mt={10}
            columnGap={4}
            rowGap={8}
            templateColumns={{
                sm: "1fr",
                md: "1fr 1fr",
                lg: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
                "2xl": "repeat(5, 1fr)",
            }}
        >
            <Box>
                <Skeleton h={280} rounded={"2xl"} mb={6}></Skeleton>
                <SkeletonText noOfLines={1} mb={5}></SkeletonText>
                <SkeletonText noOfLines={1} w={"40%"}></SkeletonText>
            </Box>
            <Room></Room>
        </Grid>
    );
}
