import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

import Button from "./components/Button"

const breakpoints = createBreakpoints({
  xs: "25em",
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
})

export const colors = {
    background: "black",
    discord: {
        dark: "#2F3136",
        black: "#202225",
        light: "#36393F"
    }
}

const styles = {
    global: (props) => ({
        "::-webkit-scrollbar": {
            width: "5px",
            height: "5px"
        },
        "::-webkit-scrollbar-thumb": {
            background: "gray",
            borderRadius: "30px"
        },
        "::-webkit-scrollbar-track": {
            background: "transparent"
        },
        body: {
            bg: "background",
        },
    })
}

const theme = extendTheme({
    breakpoints,
    styles,
    colors,
    components: {
        Button
    }
})

export default theme