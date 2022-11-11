import axios from "axios"
import { FormEvent, useState } from "react"

export default function Contact() {
    const [details, setDetails] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        message: ''
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        axios.post('/api/contact', JSON.stringify(details), { headers: { 'Content-Type': 'application/json' }})
    }

    return (
        <section className="padding bg-primary py-16 xl:py-28 max-h-[7in] sm:max-h-[6in] xl:max-h-[5in] relative xl:mt-auto mb-[4in] flex flex-col gap-8 sm:gap-16 xl:flex-row xl:justify-between items-center">
            <h2 className="flex flex-col gap-2 text-white xl:mb-8">
                <span className="font-semibold">Skontaktuj się z nami</span>
                <span className="font-bold text-4xl xl:w-max">za pomocą formularza</span>
            </h2>
            <div className="bg-white rounded-xl py-12 px-10 max-w-full xl:self-start flex flex-col gap-6 shadow-[0px_0px_81px_rgba(15,50,235,0.07)]">
                <h3 className="font-bold text-xl mb-2">Masz jakieś pytania?</h3>
                <form onSubmit={handleSubmit} className="flex flex-col sm:grid grid-cols-2 gap-8 max-w-full">
                    <div className="relative min-w-0">
                        <input className="rounded-lg py-3 px-6 border-[1px] max-w-full border-[#E4E4E9]" onChange={e => setDetails(prev => { return { ...prev, first_name: e.target.value }})} type="text" name="firstName" id='firstName' />
                    </div>
                    <div className="relative min-w-0">
                        <input className="rounded-lg py-3 px-6 border-[1px] max-w-full border-[#E4E4E9]" onChange={e => setDetails(prev => { return { ...prev, last_name: e.target.value }})} type="text" name='lastName' id='lastName' />
                    </div>
                    <div className="relative min-w-0">
                        <input className="rounded-lg py-3 px-6 border-[1px] max-w-full border-[#E4E4E9]" onChange={e => setDetails(prev => { return { ...prev, email: e.target.value }})} type="email" name="email" id='email' />
                    </div>
                    <div className="relative min-w-0">
                        <input className="rounded-lg py-3 px-6 border-[1px] max-w-full border-[#E4E4E9]" onChange={e => setDetails(prev => { return { ...prev, phone: e.target.value }})} type="tel" name="phone" id='phone' />
                    </div>
                    <textarea className="col-span-2 min-h-[1in] rounded-lg py-3 px-6 border-[1px] border-[#E4E4E9]" name="message" id="message"></textarea>
                    <button className="bg-font text-sm md:text-base transition-colors w-max font-medium hover:bg-darkPrimary text-white rounded flex items-center py-3 px-6 mt-4">Wyślij formularz</button>
                </form>
            </div>
        </section>
    )
}