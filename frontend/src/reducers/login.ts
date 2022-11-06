import { createSlice } from '@reduxjs/toolkit'

interface LoginState {
    logged: boolean
    data: {
        access: string
    }
}

const initialState: LoginState = {
    logged: false,
    data: {
        access: ''
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