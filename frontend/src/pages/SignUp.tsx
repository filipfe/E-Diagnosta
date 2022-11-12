import { FormEvent, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { client, main, skp } from "../assets/signup";
import FilledButton from "../components/FilledButton";
import ClientForm from "./signup/ClientForm";
import StationForm from "./signup/StationForm";
import Verify from "./signup/Verify";

export default function SignUp() {
    const [step, setStep] = useState<number>(0)
    return (
        <div className="flex flex-col xl:grid grid-cols-[5fr_4fr] xl:min-h-screen">
            <section className="px-[8vw] md:px-[12vw] xl:px-0 xl:flex justify-center pt-[1.4in] xl:pt-[2in] pb-16">
                <Routes>
                    <Route path='/' element={<>
                        {step === 0 && <ChooseAccount setStep={setStep} />}
                        {step === 1 && <ClientForm />}
                        {step === 2 && <StationForm />}
                    </>} />
                    <Route path='/verify/*' element={<Verify />} />
                </Routes>
            </section>
            <div className="min-w-full xl:flex items-center py-12 bg-[linear-gradient(134.13deg,rgba(239,242,254,0.55)_-25.82%,rgba(105,_127,_243,_0.473)_176.38%)]">
                <img className="max-w-[80%] mx-auto" src={main} alt="" />
            </div>
        </div>
    )
}

const ChooseAccount = ({ setStep }: { setStep: any }) => {
    const [form, setForm] = useState<1 | 2>(1)
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(!form) return
        return setStep(form)
    }

    return (
        <div className="flex flex-col text-center items-center xl:items-start xl:w-max">
            <h2 className="font-semibold text-3xl mb-4 w-full xl:text-4xl">Jaki typ konta wybierasz?</h2>
            <p className="text-[#74788D] font-medium mb-16 w-full">Wybierz spośród dostępnych opcji poniżej.</p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center text-center gap-6">
                <div className="relative">
                    <input className="peer absolute right-4 top-4 z-10" type="radio" defaultChecked={true} onChange={() => setForm(1)} name='account' id='client' />
                    <label className="flex items-center text-left px-7 py-5 cursor-pointer peer-checked:border-primary border-2 border-[#E4E4E9] rounded-lg gap-6" htmlFor="client">
                        <div className="h-12 w-12 p-4 bg-[#F3F5FE] rounded">
                            <img src={client} alt="" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="font-semibold">Chcę dołączyć jako klient</h3>
                            <p className="text-[#74788D]">Standardowy typ konta, możliwość rezerwacji</p>
                        </div>
                    </label>
                </div>
                <div className="relative">
                    <input className="peer absolute right-4 top-4 z-10" type="radio" onChange={() => setForm(2)} name='account' id='skp' />
                    <label className="flex items-center text-left px-7 py-5 cursor-pointer peer-checked:border-primary border-2 border-[#E4E4E9] rounded-lg gap-6" htmlFor="skp">
                        <div className="h-12 w-12 p-4 bg-[#F3F5FE] rounded">
                            <img src={skp} alt="" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="font-semibold">Chcę dołączyć jako SKP</h3>
                            <p className="text-[#74788D]">Typ konta stacji, możliwość zarządzania stacją</p>
                        </div>
                    </label>
                </div>
                <span className="my-3">Już posiadasz konto? <Link className="text-primary font-semibold" to='/logowanie'>Zaloguj się</Link></span>
                <FilledButton>Dalej</FilledButton>
            </form>
        </div>
    )
}