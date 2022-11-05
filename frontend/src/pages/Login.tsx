import axios from 'axios'
import { useState } from 'react'
import FilledButton from '../components/FilledButton'

export default function Login() {
    const [details, setDetails] = useState({
        email: '',
        password: ''
    })

    const handleLogin = () => {
        try {
            axios.post('/api/login', JSON.stringify(details), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.data)
            .then(data => console.log(data))
        }
        catch(err) {
            console.log(err)
        }
    }
    
    return (
        <section className='padding pt-[1.4in] md:pt-[1.8in] 2xl:pt-[2.2in] min-h-screen'>
            <form className='flex flex-col gap-4' onSubmit={handleLogin}>
                <input type='email' placeholder="Email" name='email' id='email' onChange={e => setDetails(prev => { return { ...prev, email: e.target.value }})} />
                <input type='password' placeholder="Hasło" name='password' id='password' onChange={e => setDetails(prev => { return { ...prev, password: e.target.value }})} />
                <FilledButton>Zaloguj się</FilledButton>
            </form>
        </section>
    )
}