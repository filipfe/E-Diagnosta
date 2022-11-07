import { useEffect, useRef, useState } from "react"
import { cities } from "../constants/cities"

export default function CitySearchBar({ setSearch }: { setSearch: any }) {
    const searchBar = useRef<any>(null!)
    const [input, setInput] = useState('')
    const [filteredCities, setFilteredCities] = useState(cities)
    const [menu, setMenu] = useState(false)

    useEffect(() => {
        setFilteredCities(cities.filter(city => city.toLowerCase().includes(input.toLowerCase())))
        if(filteredCities.includes(input)) setMenu(false)
        setSearch((prev: {}) => {
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
            <input className="rounded py-2 px-5 border-[1px] border-primary" onChange={e => setInput(e.target.value)} autoComplete='off' value={input} type='text' autoCorrect="off" name='city' id='city' />
            {menu && filteredCities.length > 0 && <ul className="flex flex-col transition-opacity absolute top-full right-0 left-0 rounded overflow-hidden overflow-y-scroll border-[1px] border-black max-h-[1.5in]">
                {filteredCities.map(city => <li onClick={() => setInput(city)} className="py-2 px-5 bg-white transition-colors hover:bg-[#EEEEEE] cursor-pointer">{city}</li>)}
            </ul>}
        </div>
    )
}