import { FormEvent, useState } from "react";
import CitySearchBar from "../components/CitySearchBar";

export default function Home() {
    const [search, setSearch] = useState({
        city: '',
        date: '',
        price: ''
    })
    
    const handleSearch = (e: FormEvent) => {
        e.preventDefault();

    }

    return (
        <section className="padding pt-16">
            <div className="bg-[rgba(0,40,250,0.05)] rounded-t-xl p-16 flex flex-col gap-4">
                <span className="text-primary font-medium tracking-widest text-sm">WYSZUKAJ SPOŚRÓD 1300+ STACJI</span>
                <h1 className="font-bold text-xl text-font md:text-2xl xl:text-[2.5rem] xl:leading-tight">Umów się na wizytę <br /> i poznaj swoją <span className="text-primary">diagnozę</span></h1>
                <form onSubmit={handleSearch} className='flex flex-col gap-4 mt-16'>
                    <CitySearchBar setSearch={setSearch} />
                    <input className="max-w-max" type='date' onChange={e => setSearch(prev => {
                        return {
                            ...prev,
                            date: e.target.value
                        }
                    })} name='date' id='date' />
                    <input className="max-w-max" type='number' onChange={e => setSearch(prev => {
                        return {
                            ...prev,
                            price: e.target.value
                        }
                    })} name='price' id='price' />
                </form>
            </div>
        </section>
    )
}