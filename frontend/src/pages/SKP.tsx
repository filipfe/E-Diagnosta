import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router"
import Loader from "../components/Loader"
import SKPFilter from "../components/skp/StationFilter"
import StationRef from "../components/skp/StationRef"
import useDebounce from "../hooks/useDebounce"
import Station from "./Station"

export default function SKP() {
    const [stations, setStations] = useState<StationProps[]>([])
    useEffect(() => {
        axios.get('/api/skp')
            .then(res => res.data)
            .then(data => setStations(data))
    }, [])
    return (
        <section className="padding pt-[1.4in] md:pt-[2in]">
            <Routes>
                <Route path="/*" element={<SKPList defaultStations={stations} />} />
                {stations.map(station => <Route path={`/${station.name.toLowerCase().split(" ").join("-")}-${station.id}`} element={<Station {...station} key={station.id} />} />)}
            </Routes>
        </section>
    )
}

export interface StationProps {
    id: number,
    name: string,
    city: string,
    desc: string,
    image: string
}

export interface Filter {
    city: string
}

const SKPList = ({ defaultStations }: { defaultStations: StationProps[]}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [stations, setStations] = useState<StationProps[]>(defaultStations)
    const [input, setInput] = useState('')
    const [filter, setFilter] = useState<Filter>({
        city: ''
    })
    const debounceSearch = useDebounce(input, 500)

    useEffect(() => {
        setStations([])
        let url = '/skp'
        if(input || filter.city) {
            let searchArr = [
                debounceSearch && 'q=' + debounceSearch,
                filter.city && 'c=' + filter.city
            ]
            url = `/skp/search?${searchArr.length > 0 && searchArr.map(item => item).filter(item => item).join("&")}`
        }
        return navigate(url)
    }, [debounceSearch, filter])

    useEffect(() => {
        setStations([])
        let url = '/api' + location.pathname + location.search
        axios.get(url)
            .then(res => res.data)
            .then(data => setStations(data))
    }, [location])

    return (
        <>
            <h1 className="font-semibold mb-4 text-3xl xl:text-4xl">Stacje Kontroli Pojazdów</h1>
            <SKPFilter setFilter={setFilter} setInput={setInput} filter={filter} />
            <div className="flex flex-col gap-6 sm:grid grid-cols-skp">
                {stations.length > 0 ? stations.map(station => <StationRef {...station} key={station.name} />) : <Loader className="mx-auto" />}
            </div>
        </>
    )
}