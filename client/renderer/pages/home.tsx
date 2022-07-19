import { AbsoluteCenter, Box, Button, Flex, FormControl, FormLabel, Image, Input, Text, Tooltip, useToast, VStack } from "@chakra-ui/react"
import { ipcRenderer } from "electron"
import _ from "lodash"
import { ChangeEvent, useEffect, useState } from "react"
import GuildView from "../components/GuildView"
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
    return (
      <AbsoluteCenter>
        <Flex justifyContent="center" alignItems="center" direction="column" gap={3}>
          <Image draggable={false} src="/assets/icons/no-internet.png" h="200px" />
          <Box textAlign="center">
            <Text fontSize="3xl" fontFamily="discord-bold" fontWeight="bold"><em>No Internet Connection</em></Text>
            <Text color="tomato">Connection limited or unavailable</Text>
          </Box>
          <Image draggable={false} src="/svg/no-connection.svg" h="100px" />
        </Flex>
      </AbsoluteCenter>
    )
  }

  if (update.mode == -1) {
    return (
      <AbsoluteCenter>
        <Flex justifyContent="center" alignItems="center" direction="column" gap={3}>
          <Image draggable={false} src="/assets/icons/no-updates.png" h="200px" />
          <Box textAlign="center">
            <Text fontSize="3xl" fontFamily="discord-bold" fontWeight="bold"><em>Cannot Fetch Updates</em></Text>
            <Text color="tomato">There was an issue with fetching updates. Application cannot start.</Text>
            <Text color="tomato">Error: {update.error}</Text>
          </Box>
          <Image draggable={false} src="/svg/no-connection.svg" h="100px" />
        </Flex>
      </AbsoluteCenter>
    )
  }

  return (
    <>
      {client.application && !_.isEmpty(guilds) && (
        <Flex maxH="100vh" maxW="100vw">
          <VStack h="100vh" minW="72px" bg="discord.black" overflow="auto" p={2} className="hideScroll">

            {guilds.map(guild => (
              <Tooltip key={guild.id} hasArrow placement="right" bg="discord.black" label={guild.name} color="white" ml={5} fontSize="16px" fontFamily="discord-bold" p={2} rounded="md">
                <Image className="guild-icon" onClick={() => setSelectedGuild(guild)} h="48px" draggable={false} src={guild.iconURL} cursor="pointer" />
              </Tooltip>
            ))}

          </VStack>

          {selectedGuild && <GuildView key={selectedGuild.id} guild={selectedGuild} />}
        </Flex>
      )}

    </>
  )
}