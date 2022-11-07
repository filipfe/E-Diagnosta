import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { FormEvent, useState } from 'react'
import FilledButton from '../components/FilledButton'
import { useAppDispatch } from '../main'
import { login } from '../reducers/login'

export interface User {
    first_name: string,
    last_name: string,
    email: string,
    type: string
}

export default function Login() {
    const dispatch = useAppDispatch()
    const [details, setDetails] = useState({
        email: '',
        password: ''
    })

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        try {
            axios.post('/api/logowanie', JSON.stringify(details), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.data)
            .then(data => {
                let user: User = jwtDecode(data.access)
                localStorage.setItem('login', JSON.stringify(data))
                dispatch(login({
                    data: {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        type: user.type
                    },
                    tokens: { ...data }
                }))
            })
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