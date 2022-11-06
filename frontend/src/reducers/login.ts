import { createSlice } from '@reduxjs/toolkit'

interface LoginState {
    logged: boolean
    data: {
        first_name: string,
        last_name: string,
        email: string
    }
}

const initialState: LoginState = {
    logged: false,
    data: {
        first_name: '',
        last_name: '',
        email: ''
    }
} 

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: state => {
            state.logged = true
        }
    }
})

export const { login } = loginSlice.actions

export default loginSlice.reducer