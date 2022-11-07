import axios from 'axios'
import { useState } from 'react'
import FilledButton from '../../components/FilledButton'

export default function StationForm() {
    const [alert, setAlert] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [details, setDetails] = useState({
        login_number: '',
        password: ''
    })

    const handleLogin = () => {
        if(details.password.length < 8) return setAlert("Hasło musi posiadać co najmniej 8 znaków.")
        if(details.password !== confPassword) return setAlert("Hasła się nie zgadzają!")
        try {
            axios.post('/api/signup', JSON.stringify(details), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => setAlert("Dane zostały wysłane do weryfikacji!"))
        }
        catch(err) {
            console.log(err)
        }
    }
    
    return (
        <section className='padding pt-[1.4in] md:pt-[1.8in] 2xl:pt-[2.2in] min-h-screen'>
            <form className='flex flex-col gap-4' onSubmit={handleLogin}>
                <input type='password' placeholder="Hasło" name='password' id='password' onChange={e => setDetails(prev => { return { ...prev, password: e.target.value }})} />
                <input type='password' placeholder="Powtórz Hasło" name='confPassword' id='confPassword' onChange={e => setConfPassword(e.target.value)} />
                <FilledButton type='submit'>Zarejestruj</FilledButton>
            </form>
        </section>
    )
}