import { Button, Input, InputGroup, InputRightAddon, Text, VStack } from "@chakra-ui/react";
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
    const [message, setMessage] = useState("")

    useEffect(() => {
        if (!fetch) {
            setFetch(true)
            setInterval(() => ipcRenderer.invoke('get-history', channel.id).then((m) => {
                setMessages(m.reverse())

                if (bottomRef.current) {
                    bottomRef.current.scrollIntoView({ behavior: "smooth" })
                }
            }), 1000)
        }
    })

    return (
        <VStack w="100%" alignItems="start" h="100vh" overflow="auto" bg="discord.light">

            {/* @ts-ignore */}
            {messages.map(m => <DiscordMessage message={m} key={m.id} />)}

            {/* @ts-ignore */}
            <div id="bottom" ref={bottomRef} onLoad={(e) => e.target.scrollIntoView({ behavior: "smooth" })} />
            <InputGroup position="sticky" bottom="0" bg="discord.light">
                <Input value={message} onChange={(e) => setMessage(e.target.value)} />
                <InputRightAddon cursor="pointer" userSelect="none" onClick={async() => {
                    setMessage("")
                    await ipcRenderer.invoke("send-message", message, channel.id)
                }}>
                        Send
                </InputRightAddon>
            </InputGroup>
        </VStack>
    )
}