import axios from "axios"
import { useEffect, useState } from "react"
import StationSearchBar from "../components/StationSearchBar"

export default function SKP() {
    return (
        <section className="padding pt-[1.4in] md:pt-[2in]">
            <h1 className="font-bold text-xl">Nasze stacje</h1>
            <SKPList />
        </section>
    )
}

export interface StationProps {
    id: number,
    name: string,
    image: string
}

const SKPList = () => {
    const [stations, setStations] = useState<StationProps[]>([])

    useEffect(() => {
        axios.get('/api/skp')
            .then(res => res.data)
            .then(data => setStations(data))
    }, [])

    return (
        <>
            <StationSearchBar setStations={setStations} />
            <div className="flex flex-col gap-4">
                {stations.map(station => <StationRef {...station} key={station.name} />)}
            </div>
        </>
    )
}

const StationRef = (props: StationProps) => {
    return (
        <div className="flex items-center gap-4 rounded p-4 shadow">
            <img src={`/images/skp/${props.image.split('/').pop()}`} alt="" />
            <h3>{props.name}</h3>
        </div>
    )
}