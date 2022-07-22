import { Input, VStack } from "@chakra-ui/react";
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
        <VStack ref={bottomRef} id="bottom" w="100%" alignItems="start" h="100vh" overflow="auto" bg="blackAlpha.800">

            {/* @ts-ignore */}
            {messages.map(m => <DiscordMessage message={m} key={m.id} onLoad={e => e.target.scrollIntoView({ behavior: "smooth" })} />)}

            <form style={{ position:"sticky", bottom: "0px", width: "100%" }} onSubmit={(e) => {
                e.preventDefault()

                // @ts-ignore
                const message = e.target.message.value

                if(message) {
                    ipcRenderer.invoke('send-message', message, channel.id)

                    // @ts-ignore
                    e.target.message.value = ""
                }
            }}>

                <Input name="message" rounded="none" borderBottomLeftRadius={"10px"} bg="black" border="2px solid red" variant="flushed" placeholder="Message" p={2} colorScheme="red"  />
                <Input type="submit" hidden />
            </form>
        </VStack>
    )
}