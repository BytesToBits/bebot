import MessageInterface from "../interfaces/MessageInterface";
import moment from "moment"
import Markdown from "./Markdown";
import { Box, Flex, Image, Text, Tooltip } from "@chakra-ui/react";

import { darken } from "@chakra-ui/theme-tools"

interface DM {
    message: MessageInterface
    key?: any
}

const formatDate = (timestamp: number) => {
    const now = new Date()
    const created = new Date(timestamp)
    const momentum = moment(timestamp)
    let date = momentum.format("MM/DD/YYYY")

    // @ts-ignore
    const secondsDiff = (now-created)/1000

    if (secondsDiff < 172800) {
        if(secondsDiff < 86400) {
            date = "Today at " + momentum.format("hh:mm A")
        } else {
            date = "Yesterday at " + momentum.format("hh:mm A")
        }
    }

    return date

}

export default function DiscordMessage({ message, ...props }: DM) {
    const momentum = moment(message.createdTimestamp)
    const date = formatDate(message.createdTimestamp)
    const fullDate = momentum.format("dddd, MMMM Do, YYYY HH:mm:ss A")

    return (
        <Flex {...props} py={2} px={5} w="100%" gap={2} _hover={{ background: "rgba(255,0,0,0.3)" }}>
            <Image className="avatar" fallbackSrc="https://discord.com/assets/3c6ccb83716d1e4fb91d3082f6b21d77.png" src={`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=4096`} />

            <Box w="100%">
                <Flex alignItems="baseline">
                    <Text fontWeight={"bold"}>{message.author.username}</Text>
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