import { FormEvent, useState } from "react";
import CitySearchBar from "../CitySearchBar";
import FilledButton from "../FilledButton";
import { landingMain } from '../../assets/home'

export const inputStyles = 'py-3 px-6 rounded shadow-[0px_6px_132px_rgba(76,101,234,0.08)] bg-white placeholder:text-[#B4BFF7] font-medium text-primary'

export default function Landing() {
    const [search, setSearch] = useState({
        city: '',
        date: '',
        name: ''
    })
    
    const handleSearch = (e: FormEvent) => {
        e.preventDefault();

    }
    return (
        <section className="padding py-[0.8in] md:py-[1.2in] bg-background flex flex-col xl:grid xl:gap-8 grid-cols-[4fr_3fr]">
            <div className="flex flex-col gap-3">
                <span className="font-semibold tracking-wider xl:text-xl">z nami już <span className="text-primary">2349 pojazdów</span></span>
                <h1 className="font-bold text-3xl text-font md:text-[2.5rem] xl:text-[2.8rem] md:leading-tight">Poznaj naszą ofertę <br /> badań technicznych <br/>i ruszaj<span className="text-primary"> w drogę</span></h1>
                <h3 className="font-semibold text-sm mt-16">Uzupełnij formularz, aby wyszukać</h3>
                <form onSubmit={handleSearch} className='flex flex-col sm:grid grid-cols-2 gap-4 max-w-max'>
                    <input className={`col-span-2 ${inputStyles}`} type='text' onChange={e => setSearch(prev => {
                        return {
                            ...prev,
                            name: e.target.value
                        }
                    })} name='name' id='name' placeholder="Wpisz nazwę SKP" />
                    <input className={inputStyles} type='date' onChange={e => setSearch(prev => {
                        return {
                            ...prev,
                            date: e.target.value
                        }
                    })} name='date' id='date' placeholder="Termin" />
                    <CitySearchBar setSearch={setSearch} />
                    <FilledButton>Wyszukaj</FilledButton>
                </form>
            </div>
            <img className="mt-24 mx-[12vw] xl:mx-0 xl:mt-0 xl:ml-auto" src={landingMain} alt="" />
        </section>
    )
}