import { Flex, Input, VStack } from "@chakra-ui/react";
import { ipcRenderer } from "electron";
import { useEffect, useRef, useState } from "react";
import { ChannelInterface } from "../interfaces/ChannelInterface";
import MessageInterface from "../interfaces/MessageInterface";
import DiscordMessage from "./DiscordMessage";

interface CVI {
    channel: ChannelInterface
}

export default function ChannelView({ channel }: CVI) {
    const [fetch, setFetch] = useState(false)
    const [messages, setMessages] = useState<MessageInterface[]>([])
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!fetch) {
            setFetch(true)
            ipcRenderer.on('send-message', (_, channelID) => {
                if (channel.id == channelID) {
                    ipcRenderer.invoke('get-history', channel.id).then(setMessages)
                }
            })

            ipcRenderer.invoke('get-history', channel.id).then(setMessages)
        }
    })

    return (
        <Flex
            direction={"column"}
            w="calc(100vw - 240px - 72px - 255px)"
            h="100vh"
        >
            <VStack ref={bottomRef} id="bottom" w="100%" alignItems="start" h="100vh" overflow="auto" bg="blackAlpha.800">

                {/* @ts-ignore */}
                {messages.map(m => <DiscordMessage message={m} key={m.id} onLoad={e => e.target.scrollIntoView({ behavior: "smooth" })} />)}
            </VStack>

            <form style={{ position: "sticky", bottom: "0px", width: "100%", padding: "20px" }} onSubmit={(e) => {
                e.preventDefault()

                // @ts-ignore
                const message = e.target.message.value

                if (message) {
                    // @ts-ignore
                    e.target.message.value = ""
                    ipcRenderer.invoke('send-message', message, channel.id)
                }
            }}>

                <Input onChange={async () => await ipcRenderer.invoke('trigger-typing', channel.id)} name="message" rounded="md" bg="black" variant="flushed" placeholder="Message" p={5} border="2px solid red" />
                <Input type="submit" hidden />
            </form>
        </Flex>
    )
}