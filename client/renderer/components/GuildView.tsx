import { Box, Collapse, Flex, Icon, useDisclosure, VStack } from "@chakra-ui/react";
import { ipcRenderer } from "electron";
import _ from "lodash";
import { useState } from "react";
import { ChannelInterface } from "../interfaces/ChannelInterface";
import { GuildInterface } from "../interfaces/GuildInterface";

import { AiOutlineRight } from "react-icons/ai"
import ChannelView from "./ChannelView";
import EllipsisText from "react-ellipsis-text";

interface GVI {
    guild: GuildInterface,
}

interface CI {
    data?: ChannelInterface,
    channels?: ChannelInterface[],
    key?: any,
    setSelected: any
}

const Channel = ({ data, setSelected }: CI) => {

    return (
        <Box onClick={() => setSelected(data)} fontSize="16px" key={data.id} _hover={{ background: "red.700" }} w="224px" h="34px" rounded="md" cursor="pointer" p={1}>
            <EllipsisText text={data.name} length={19} />
        </Box>
    )
}

const Category = ({ data, channels, setSelected }: CI) => {
    const { isOpen, onToggle } = useDisclosure()

    if (_.isEmpty(channels)) return null

    return (
        <Box minW="224px" key={data.id} userSelect="none" color="gray.200" fontSize="12px">
            <Box fontWeight="bold" fontSize="xs"  _hover={{ background: "red.800" }} display="inline-block" h="34px" rounded="md" textTransform={"uppercase"}  cursor="pointer" p={1} onClick={onToggle}>
                <Icon as={AiOutlineRight} transform={isOpen ? "rotate(90deg)" : ""} transition=".1s linear" /> <EllipsisText text={data.name} length={19} />
            </Box>
            
            <Box px={2}>
                <Collapse in={isOpen}>
                    {channels.map(c => <Channel setSelected={setSelected} data={c} key={c.id} />)}
                </Collapse>
            </Box>
        </Box>
    )
}

export default function GuildView({ guild }: GVI) {
    const [selectedChannel, setSelectedChannel] = useState<ChannelInterface | null>(null)

    const [channels, setChannels] = useState<ChannelInterface[]>([])

    for (let channel of guild.channels) {
        if (channels.find((e) => e.id == channel)) continue

        ipcRenderer.invoke('get-channel', channel).then((data: ChannelInterface) => {
            if (!channels.includes(data)) {
                if (data.type == "GUILD_TEXT" || data.type == "GUILD_CATEGORY" || data.type == "GUILD_NEWS") {
                    setChannels([...channels, data].sort((a, b) => a.rawPosition - b.rawPosition))
                }
            }
        })
    }

    return (
        <>
            <VStack w="240px" bg="blackAlpha.800" borderRight="2px solid red" roundedRight={"xl"}>
                <Flex h="48px" fontSize="15px" w="100%" alignItems="center" p={2} fontWeight="bold" borderBottom={`1.5px solid red`} >
                    {guild.name}
                </Flex>

                <VStack overflow={"auto"} className="hideScroll">
                    {/* {channels.map(channel => (
                        <Box key={channel.id} _hover={{ background: "discord.light" }} w="224px" h="34px" rounded="md" cursor="pointer" p={1}>
                            {channel.name}
                        </Box>
                    ))} */}
                    {channels.filter(c => c.type == "GUILD_CATEGORY").map((category) => <Category setSelected={setSelectedChannel} key={category.id} data={category} channels={channels.filter(c => c.parentId == category.id)} />)}
                </VStack>
            </VStack>

            {!_.isEmpty(channels) && selectedChannel && <ChannelView key={selectedChannel.id} channel={selectedChannel} />}
        </>
    )
}