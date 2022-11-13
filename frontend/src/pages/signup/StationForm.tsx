import axios from 'axios'
import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import FilledButton from '../../components/FilledButton'
import { inputStyles } from '../../components/home/Contact'
import Loader from '../../components/Loader'

export default function StationForm() {
    const [step, setStep] = useState<1 | 2>(1)
    const [status, setStatus] = useState({
        ok: false,
        message: ''
    })
    const [confPassword, setConfPassword] = useState('')
    const [ownerDetails, setOwnerDetails] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: ''
    })
    const [stationDetails, setStationDetails] = useState({
        name: '',
        address: '',
        community: '',
        postal_code: '',
        email: '',
        phone: '',
        nip: ''
    })

    const handleStepChange = (e: FormEvent) => {
        e.preventDefault()
        return setStep(2)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setStatus({ ok: false, message: 'loading' })
        if(ownerDetails.password !== confPassword) return setStatus({ok: false, message: "Hasła się nie zgadzają!"})
        if(ownerDetails.password.length < 8) return setStatus({ok: false, message: "Hasło musi posiadać co najmniej 8 znaków."})
        try {
            axios.post('/api/rejestracja/klient', JSON.stringify({owner: ownerDetails, station: stationDetails, type: 'station'}), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => setStatus({
                ok: true,
                message: ''
            }))
        }
        catch(err) {
            console.log(err)
        }
    }
    
    if(status.ok) return <section className="padding pt-[1in]"><h1 className='min-h-screen padding'>Email weryfikacyjny został wysłany</h1></section>

    switch(step) {
        case 1:
            return (
                <div className='flex flex-col text-center items-center xl:items-start xl:w-max'>
                    <h2 className="font-semibold text-[2.4rem] mb-4 xl:mb-6 w-full xl:text-5xl">Podaj dane właściciela</h2>
                    <p className="text-[#74788D] font-medium mb-16 w-full xl:text-lg">Uzupełnij formularz, aby zarejestrować stację</p>
                    <form className='flex flex-col gap-4 font-medium relative' onSubmit={handleStepChange}>
                        <div className='flex flex-col max-w-full sm:grid grid-cols-2 gap-6'>
                            <div className='relative'>
                                <input className={inputStyles.input} required type='text' name='firstName' id='firstName' onChange={e => setOwnerDetails(prev => { return { ...prev, first_name: e.target.value }})} />
                                <span className={`${ownerDetails.first_name ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Imię</span>
                            </div>                    
                            <div className='relative'>
                                <input className={inputStyles.input} required type='text' name='lastName' id='lastName' onChange={e => setOwnerDetails(prev => { return { ...prev, last_name: e.target.value }})} />
                                <span className={`${ownerDetails.last_name ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Nazwisko</span>
                            </div>
                            <div className='relative'>
                                <input className={inputStyles.input} required type='email' name='email' id='email' onChange={e => setOwnerDetails(prev => { return { ...prev, email: e.target.value }})} />
                                <span className={`${ownerDetails.email ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Email</span>
                            </div>
                            <div className='relative'>
                                <input className={inputStyles.input} required type='tel' name='phone' id='phone' onChange={e => setOwnerDetails(prev => { return { ...prev, phone: e.target.value }})} />
                                <span className={`${ownerDetails.phone ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Numer telefonu</span>
                            </div>
                            <div className='relative min-w-0'>
                                <input className={inputStyles.input} required type='password' name='password' id='password' onChange={e => setOwnerDetails(prev => { return { ...prev, password: e.target.value }})} />
                                <span className={`${ownerDetails.password ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Hasło</span>
                            </div>
                            <div className='relative'>
                                <input className={inputStyles.input} required type='password' name='confPassword' id='confPassword' onChange={e => setConfPassword(e.target.value)} />
                                <span className={`${confPassword ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Powtórz hasło</span>
                            </div>
                        </div>
                        {!status.ok && status.message && status.message !== 'loading' && <span className='text-red-400 font-medium'>{status.message}</span>}
                        {status.message === 'loading' && <Loader className='absolute bottom-0 left-0' />}
                        <span className="mt-6 mb-4">Już posiadasz konto? <Link className="text-primary font-semibold" to='/logowanie'>Zaloguj się</Link></span>
                        <FilledButton className='mx-auto' type='submit'>Dalej</FilledButton>
                    </form>
                </div>
            )
        case 2:
            return (
                <div className='flex flex-col text-center items-center xl:items-start xl:w-max'>
                    <h2 className="font-semibold text-[2.4rem] mb-4 xl:mb-6 w-full xl:text-5xl">Podaj dane stacji</h2>
                    <p className="text-[#74788D] font-medium mb-16 w-full xl:text-lg">Uzupełnij formularz, aby zarejestrować stację</p>
                    <form className='flex flex-col gap-4 font-medium relative' onSubmit={handleSubmit}>
                        <div className='flex flex-col max-w-full sm:grid grid-cols-2 gap-6'>
                            <div className='relative'>
                                <input className={inputStyles.input} type='text' name='name' id='name' onChange={e => setStationDetails(prev => { return { ...prev, name: e.target.value }})} value={stationDetails.name} />
                                <span className={`${stationDetails.name ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Nazwa</span>
                            </div>                    
                            <div className='relative'>
                                <input className={inputStyles.input} type='text' name='address' id='address' onChange={e => setStationDetails(prev => { return { ...prev, address: e.target.value }})} value={stationDetails.address} />
                                <span className={`${stationDetails.address ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Adres</span>
                            </div>
                            <div className='relative'>
                                <input className={inputStyles.input} type='text' name='community' id='community' onChange={e => setStationDetails(prev => { return { ...prev, community: e.target.value}})} value={stationDetails.community} />
                                <span className={`${stationDetails.community ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Gmina</span>
                            </div>
                            <div className='relative min-w-0'>
                                <input className={inputStyles.input} type='text' name='postalCode' id='postalCode' onChange={e => setStationDetails(prev => { return { ...prev, postal_code: e.target.value }})} value={stationDetails.postal_code} />
                                <span className={`${stationDetails.postal_code ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Kod pocztowy</span>
                            </div>
                            <div className='relative'>
                                <input className={inputStyles.input} type='email' name='stationEmail' id='stationEmail' onChange={e => setStationDetails(prev => { return { ...prev, email: e.target.value }})} value={stationDetails.email} />
                                <span className={`${stationDetails.email ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Email</span>
                            </div>
                            <div className='relative'>
                                <input className={inputStyles.input} type='tel' name='stationPhone' id='stationPhone' onChange={e => setStationDetails(prev => { return { ...prev, phone: e.target.value }})} value={stationDetails.phone} />
                                <span className={`${stationDetails.phone ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Numer telefonu</span>
                            </div>
                        </div>
                        {!status.ok && status.message && status.message !== 'loading' && <span className='text-red-400 font-medium'>{status.message}</span>}
                        {status.message === 'loading' && <Loader className='absolute bottom-0 left-0' />}
                        <span className="mt-6 mb-4">Już posiadasz konto? <Link className="text-primary font-semibold" to='/logowanie'>Zaloguj się</Link></span>
                        <FilledButton className='mx-auto' type='submit'>Zarejestruj</FilledButton>
                    </form>
                </div>
            )
    }
}