import { AbsoluteCenter, Box, Button, Flex, FormControl, FormLabel, Image, Input, Slide, Text, Tooltip, useToast, VStack } from "@chakra-ui/react"
import { ipcRenderer } from "electron"
import _, { transform } from "lodash"
import { ChangeEvent, useEffect, useState } from "react"
import GuildView from "../components/GuildView"
import UpdateError from "../components/Pages/UpdateError"
import NotConnected from "../components/Pages/NotConnected"
import ClientInterface from "../interfaces/ClientInterface"
import { GuildInterface } from "../interfaces/GuildInterface"
import UpdateInterface from "../interfaces/UpdateInterface"

export default function Home() {
  const [firstFetch, setFirstFetch] = useState(false)
  const [connected, setConnected] = useState(true)
  const [update, setUpdate] = useState<UpdateInterface>({ mode: null })
  const [client, setClient] = useState<ClientInterface>({})

  const [guilds, setGuilds] = useState<GuildInterface[]>([])
  const [selectedGuild, setSelectedGuild] = useState<GuildInterface | null>(null)

  const toast = useToast({
    position: "top-right",
    status: "info",
    variant: "top-accent",
    isClosable: false
  })

  useEffect(() => {
    if (!firstFetch) {
      const discordInit = async () => {
        const client = await ipcRenderer.invoke('get-client')
        setClient(client)

        if (client.application) {
          const new_guilds = []
          for (let guildID of client.guilds) {
            new_guilds.push(await ipcRenderer.invoke("get-guild", guildID))
          }

          setGuilds(new_guilds)
        }
      }

      setInterval(() => {
        setConnected(navigator.onLine)
        discordInit()
      }, 1000)

      ipcRenderer.on("update", (_, data: UpdateInterface) => {
        setUpdate(data)

        if (data.mode == -1) {
          toast({ title: "Update Error", description: data.error, status: "error" })
        } else if (data.mode == 2) {
          toast({ title: "Update Found", description: `Downloading: ${data.info.version}`, status: "success" })
        }
      })


      ipcRenderer.send("check-updates")
      setFirstFetch(true)
    }
  })

  if (!connected) {
    return <NotConnected />
  }

  if (update.mode == -1) {
    return <UpdateError />
  }

  return (
    <>
      {client.application && !_.isEmpty(guilds) && (
        <Flex maxH="100vh" maxW="100vw">
          <VStack bg="blackAlpha.800" h="100vh" minW="72px" overflow="auto" p={2} className="hideScroll" borderRight="2px solid red" rounded={"xl"} zIndex={100}>
            <Tooltip hasArrow placement="right" bg="discord.black" label={"BeBot"} color="white" ml={5} fontSize="16px" fontWeight="bold" p={2} rounded="md">
              <Image src="/images/bb.png" h="40px" onClick={() => setSelectedGuild(null)} cursor="pointer" draggable={false} />
            </Tooltip>

            {guilds.map(guild => (
              <Tooltip key={guild.id} hasArrow placement="right" bg="discord.black" label={guild.name} color="white" ml={5} fontSize="16px" fontWeight="bold" p={2} rounded="md">
                <Image className={selectedGuild && selectedGuild.id == guild.id ? "guild-icon selected" : "guild-icon"} onClick={() => setSelectedGuild(guild)} h="48px" draggable={false} src={guild.iconURL} cursor="pointer" />
              </Tooltip>
            ))}

          </VStack>

          <Slide direction="left" in={selectedGuild ? true : false} style={{ zIndex: 99, marginLeft: "72px"}}>
            <Flex h="100vh" w="100vw">
              {selectedGuild && <GuildView key={selectedGuild.id} guild={selectedGuild} />}
            </Flex>
          </Slide>
        </Flex>
      )}

    </>
  )
}