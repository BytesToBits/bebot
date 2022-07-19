import { useState } from "react";

export default function useFetch() {
    const [fetch, setFetch] = useState(false)

    return {
        hasFetched: fetch,
        init: () => setFetch(true)
    }
}