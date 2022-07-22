import { Box, Flex, Image, Text } from "@chakra-ui/react";

export default function UpdateError() {
    return (
        <Flex
            w="100vw"
            h="100vh"
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Image src="/assets/icons/no-internet.png" draggable={false} h={"xs"} />

            <Box px={5} py={2} textAlign="center" rounded="xl" mt={10} border="2px solid red" bg="black">
                <Text>Unable to reach for updates. Try launching the application later.</Text>
            </Box>
        </Flex>
    )
}