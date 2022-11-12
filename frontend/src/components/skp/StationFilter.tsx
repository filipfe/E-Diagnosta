import axios from "axios"
import { useEffect, useState } from "react"
import { Filter } from "../../pages/SKP"

interface FilterProps {
    setInput: any,
    setFilter: any,
    filter: Filter
}


export default function SKPFilter({ setInput, setFilter, filter }: FilterProps) {
    const [active, setActive] = useState({
        cities: false
    })
    const [allFilters, setAllFilters] = useState({
        cities: [],
        vehicles: []
    })

    useEffect(() => {
        axios.get('/api/skp/filters')
            .then(res => res.data)
            .then(data => setAllFilters(data))
    }, [])

    return (
        <div className="flex items-center justify-between">
            <input className="mb-8 mt-4" type='text' onChange={e => setInput(e.target.value)} placeholder="Wpisz nazwę stacji" />
            <div className="flex items-center gap-4">
                <h4 className="font-semibold">Miasto: </h4>
                <div className="relative">
                    <button className="bg-primary py-2 px-5 rounded text-white" onClick={() => setActive(prev => { return { ...prev, cities: !prev.cities }})}>{filter.city ? filter.city : 'Wybierz miasto'}</button>
                    {active.cities && <ul className="flex flex-col absolute top-[120%] z-10 right-0 shadow-md">
                        {allFilters.cities.map(city => <li className="py-2 px-5 bg-white cursor-pointer" onClick={() => setFilter((prev: {}) => { return { ...prev, city: city}})}>{city}</li>)}
                    </ul>}
                </div>
            </div>
        </div>
    )
}