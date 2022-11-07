import { FormEvent, useState } from "react";
import CitySearchBar from "../components/CitySearchBar";
import FilledButton from "../components/FilledButton";

export default function Home() {
    const [search, setSearch] = useState({
        city: '',
        date: '',
        name: ''
    })
    
    const handleSearch = (e: FormEvent) => {
        e.preventDefault();

    }

    return (
        <section className="padding pt-16">
            <div className="bg-[rgba(0,40,250,0.05)] rounded-t-xl p-16 flex flex-col gap-4">
                <span className="text-primary font-medium tracking-widest text-sm">WYSZUKAJ SPOŚRÓD 1300+ STACJI</span>
                <h1 className="font-bold text-xl text-font md:text-2xl xl:text-[2.5rem] xl:leading-tight">Umów się na wizytę <br /> i poznaj swoją <span className="text-primary">diagnozę</span></h1>
                <h3 className="font-semibold text-sm mt-16">Uzupełnij formularz, aby wyszukać</h3>
                <form onSubmit={handleSearch} className='flex flex-col sm:grid grid-cols-2 gap-4 max-w-max'>
                    <input className="col-span-2 py-2 px-5" type='text' onChange={e => setSearch(prev => {
                        return {
                            ...prev,
                            name: e.target.value
                        }
                    })} name='name' id='name' />
                    <input type='date' onChange={e => setSearch(prev => {
                        return {
                            ...prev,
                            date: e.target.value
                        }
                    })} name='date' id='date' />
                    <CitySearchBar setSearch={setSearch} />
                    <FilledButton>Wyszukaj stacje</FilledButton>
                </form>
            </div>
        </section>
    )
}