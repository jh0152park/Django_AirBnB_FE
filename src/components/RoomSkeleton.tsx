import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function RoomSkeleton() {
    return (
        <Box>
            <Skeleton h={280} rounded={"2xl"} mb={6}></Skeleton>
            <SkeletonText noOfLines={1} mb={5}></SkeletonText>
            <SkeletonText noOfLines={1} w={"40%"}></SkeletonText>
        </Box>
    );
}
