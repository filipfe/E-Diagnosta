import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import useDebounce from "../hooks/useDebounce"

export default function SKP() {
    return (
        <section className="padding pt-[1.4in] md:pt-[2in]">
            <h1 className="font-semibold mb-4 text-3xl xl:text-4xl">Stacje Kontroli Pojazdów</h1>
            <SKPList />
        </section>
    )
}

export interface StationProps {
    id: number,
    name: string,
    city: string,
    image: string
}

const SKPList = () => {
    const [stations, setStations] = useState<StationProps[]>([])
    const [input, setInput] = useState('')
    const debounceSearch = useDebounce(input, 300)

    useEffect(() => {
        let url = `/api/skp${debounceSearch && '/search?q=' + debounceSearch}`
        axios.get(url)
            .then(res => res.data)
            .then(data => setStations(data))
    }, [debounceSearch])

    return (
        <>
            <div className="flex items-center justify-between">
                <input className="mb-8 mt-4" type='text' onChange={e => setInput(e.target.value)} placeholder="Wpisz nazwę stacji" />
                <div className="flex items-center gap-4">
                    <h4 className="font-semibold">Miasto: </h4>

                </div>
            </div>
            <div className="flex flex-col gap-6 sm:grid grid-cols-skp">
                {stations.length > 0 ? stations.map(station => <StationRef {...station} key={station.name} />) : <Loader />}
            </div>
        </>
    )
}

const StationRef = (props: StationProps) => {
    return (
        <div className="flex flex-col gap-6 rounded p-6 border-[#E4E4E9] border-[1px]">
            <div className="flex items-center gap-4">
                <img className="rounded" src={`/images/skp/${props.image.split('/').pop()}`} alt="" />
                <h3 className="font-bold">{props.name}</h3>
            </div>
            <p className="text-[#74788D]">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex deserunt explicabo, quam repellat tenetur nostrum dolor, rerum animi similique atque esse modi laborum.</p>
            <div className="flex items-center justify-between">
                <h4 className="font-semibold">{props.city}</h4>
                <h4 className="font-semibold">10 - 18</h4>
                <button className="text-primary font-semibold">Wyświetl</button>
            </div>
        </div>
    )
}