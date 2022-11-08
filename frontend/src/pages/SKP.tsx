import axios from "axios"
import { useEffect, useState } from "react"

export default function SKP() {
    return (
        <section className="padding pt-[1in]">
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

interface FilterProps {
    data: StationProps[],
    input: string
}

const SKPList = () => {
    const [stations, setStations] = useState<StationProps[]>([])
    const [filter, setFilter] = useState<FilterProps>({
        data: [],
        input: ''
    })

    useEffect(() => {
        axios.get('/api/skp')
            .then(res => res.data)
            .then(data => setStations(data))
    }, [])

    useEffect(() => {
        setFilter(prev => {
            return {
                ...prev,
                data: stations.filter(station => station.name.toLowerCase().includes(filter.input))
            }
        })
    }, [filter.input])

    return (
        <>
            <input className="mb-8" type='text' onChange={e => setFilter({...filter, input: e.target.value})} placeholder="Wyszukaj nazwę stacji" />
            <div className="flex flex-col gap-4">
                {filter.input ? filter.data.map(station => <StationRef {...station} key={station.name} />) : stations.map(station => <StationRef {...station} key={station.name} />) }
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