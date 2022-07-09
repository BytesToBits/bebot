import MessageInterface from "../interfaces/MessageInterface";
import moment from "moment"
import Markdown from "./Markdown";
import { Box, Flex, Image, Text, Tooltip } from "@chakra-ui/react";

import { darken } from "@chakra-ui/theme-tools"

interface DM {
    message: MessageInterface
    key?: any
}

export default function DiscordMessage({ message }: DM) {
    const momentum = moment(message.createdTimestamp)
    const date = momentum.format("MM/DD/YYYY hh:mm A")
    const fullDate = momentum.format("dddd, MMMM Do, YYYY HH:mm:ss A")

    return (
        <Flex py={2} px={5} w="100%" gap={2} _hover={{ background: darken("discord.light", 2) }}>
            <Image className="avatar" src={`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=4096`} />

            <Box w="100%">
                <Flex alignItems="baseline">
                    <Text fontFamily="discord-bold">{message.author.username}</Text>
                    <Tooltip label={fullDate} hasArrow rounded="md" placement="top" color="white" bg="black">
                        <Text fontSize="10px" ml={1} color="gray.400" userSelect={"none"}>{date}</Text>
                    </Tooltip>
                </Flex>

                {/* <Markdown>
                    {message.content.replace("\n", "  ")}
                </Markdown> */}
                <Box>
                    {message.content.split("\n").map((content, i) => <Markdown key={content + i}>{content}</Markdown>)}
                </Box>
            </Box>
        </Flex>
    )
}