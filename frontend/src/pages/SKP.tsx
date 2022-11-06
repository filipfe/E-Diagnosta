import axios from "axios"
import { useEffect, useState } from "react"
import SKPSearch from "../components/SKPSearch"

export default function SKP() {
    return (
        <section className="padding pt-[1in]">
            <h1 className="mb-8 font-bold text-xl">Nasze stacje</h1>
            <SKPSearch />
            <SKPList />
        </section>
    )
}

interface StationProps {
    name: '',
    image: ''
}

const SKPList = () => {
    const [stations, setStations] = useState<StationProps[]>([])

    useEffect(() => {
        axios.get('/api/skp')
            .then(res => res.data)
            .then(data => setStations(data))
    }, [])

    return (
        <div className="flex flex-col gap-4">
            {stations.map(station => <StationRef {...station} key={station.name} />)}
        </div>
    )
}

const StationRef = (props: StationProps) => {
    return (
        <div className="flex items-center">
            <img src={`/images/${props.image.split('/').pop()}`} alt="" />
            <h3>{props.name}</h3>
        </div>
    )
}