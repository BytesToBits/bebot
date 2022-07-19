import { useState } from "react";

export default function useLoading() {
    const [loading, setLoading] = useState(false)

    return {
        isLoading: loading,
        toggleLoad: (status?) => { setLoading(status ?? !loading) }
    }
}