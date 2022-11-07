import { useEffect, useState } from "react"

export default function SKPSearch() {
    const [input, setInput] = useState('')
    useEffect(() => {
        console.log(`wyszukano ${input}`)
    }, [input])
    return <input type='text' onChange={e => setInput(e.target.value)} placeholder="Wyszukaj nazwę stacji" />
}