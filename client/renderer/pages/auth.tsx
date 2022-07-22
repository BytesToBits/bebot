import { Button, Flex, FormControl, FormHelperText, FormLabel, Image, Input } from "@chakra-ui/react"
import { ipcRenderer } from "electron"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useFetch from "../hooks/useFetch"
import useLoading from "../hooks/useLoading"
import ClientInterface from "../interfaces/ClientInterface"

export default function Auth() {
    const Fetch = useFetch()
    const [client, setClient] = useState<ClientInterface>({})
    const [token, setToken] = useState("")
    const { isLoading, toggleLoad } = useLoading()
    const router = useRouter()

    useEffect(() => {
        if (!Fetch.hasFetched) {
            Fetch.init()

            ipcRenderer.invoke('get-client').then(setClient)
        }
    })

    console.log(client)

    if (client.application) {
        router.push("/home")
    }

    return (
        <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center" direction="column" gap={2}>
            <Image h={"250px"} src={"/images/logo.png"} draggable={false} />

            <Flex
                direction="column"
                p={5}
                rounded="xl"
                borderTop={"5px solid red"}
                borderRight={"5px solid red"}
                borderBottom={"5px solid white"}
                borderLeft={"5px solid white"}
                bg="black"
                w="480px"
                gap={5}
                alignItems="center"
            >

                <FormControl isRequired>
                    <FormLabel>BOT TOKEN</FormLabel>
                    <Input onChange={e => setToken(e.target.value)} type="password" placeholder="••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••" />
                    <FormHelperText>
                        {"BeBot is and will not be responsible for any actions taken against your account by Discord. We are not responsible for any application misuse."}
                    </FormHelperText>
                </FormControl>

                <Button maxW="max-content" variant="important" onClick={async() => {
                    toggleLoad(true)
                    if(token) {
                        await ipcRenderer.invoke("discord-login", token)
                        setClient(await ipcRenderer.invoke("get-client"))
                    }
                    toggleLoad(false)
                }} isLoading={isLoading} loadingText="Loading...">Authorize</Button>

            </Flex>
        </Flex>
    )
}