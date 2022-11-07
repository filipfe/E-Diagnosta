import { createSlice } from '@reduxjs/toolkit'

export interface LoginState {
    logged: boolean
    data: {
        type: string,
        first_name: string,
        last_name: string,
        email: string
    },
    tokens: {
        access: string,
        refresh: string
    }
}

const initialState: LoginState = {
    logged: false,
    data: {
        type: '',
        first_name: '',
        last_name: '',
        email: ''
    },
    tokens: {
        access: '',
        refresh: ''
    }
} 

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, action) => {
            state.logged = true
            state.data = action.payload.data
            state.tokens = action.payload.tokens
        },
        logout: state => {
            localStorage.removeItem('login')
            state.logged = false
            state.data = {
                ...initialState.data
            }
            state.tokens = {
                ...initialState.tokens
            }
        }
    }
})

export const { login, logout } = loginSlice.actions

export default loginSlice.reducer