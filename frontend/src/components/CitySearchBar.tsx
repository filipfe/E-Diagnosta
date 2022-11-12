import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { cities } from "../constants/cities"
import { inputStyles } from "./home/Landing"

export default function CitySearchBar({ setSearch }: { setSearch: any }) {
    const searchBar = useRef<any>(null!)
    const [input, setInput] = useState('')
    const [filteredCities, setFilteredCities] = useState([])
    const [menu, setMenu] = useState(false)

    useEffect(() => {
        let url = `/skp/cities/search${input ? '?c=' + input : ''}`
        axios.get(url)
            .then(res => res.data)
            .then(data => setFilteredCities(data))
        if(filteredCities.findIndex((city: string) => city.toLowerCase() === input) > -1) setSearch((prev: {}) => {
            return {
                ...prev,
                city: input
            }
        })
    }, [input])

    const handleBlur = (e: Event) => {
        if(searchBar.current && !searchBar.current.contains(e.target)) return setMenu(false)
        return setMenu(true)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleBlur)
        return () => document.removeEventListener('mousedown', handleBlur)
    }, [searchBar])

    return (
        <div ref={searchBar} className="relative max-w-max">
            <input className={inputStyles} onChange={e => setInput(e.target.value)} autoComplete='off' value={input} type='text' autoCorrect="off" name='city' id='city' placeholder="Miasto" />
            {menu && filteredCities.length > 0 && <ul className="flex flex-col transition-opacity absolute top-full right-0 left-0 rounded overflow-hidden overflow-y-scroll border-[1px] border-black max-h-[1.5in]">
                {filteredCities.map(city => <li onClick={() => setInput(city)} className="py-2 px-5 bg-white transition-colors hover:bg-[#EEEEEE] cursor-pointer">{city}</li>)}
            </ul>}
        </div>
    )
}