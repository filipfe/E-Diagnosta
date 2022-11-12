import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

export default function StationSearchBar({ setStations }: { setStations: any }) {
    const [input, setInput] = useState('')
    const navigate = useNavigate()
    
    useEffect(() => {
        if(!input) navigate('/skp')
        if(input) {
            setStations([])
            let url = `/skp/search?q=${input}`
            navigate(url)
            axios.get(url)
                .then(res => res.data)
                .then(data => setStations(data))
        }
    }, [input])

    return <input className="mb-8 mt-4" type='text' onChange={e => setInput(e.target.value)} placeholder="Wpisz nazwę stacji" />
}