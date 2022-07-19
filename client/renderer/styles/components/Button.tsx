import { ButtonProps } from "@chakra-ui/react"

const Button: { [props: string]: {[subprops: string]: ButtonProps} } = {
    variants: {
        important: {
            fontWeight: "semibold",
            bg: "red",
            border: "2px solid red",
            transition: ".3s linear",
            _hover: {
                bg: "white",
                color: "black",
            }
        }
    }
}

export default Button