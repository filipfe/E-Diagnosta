import { createSlice } from '@reduxjs/toolkit'

export interface LoginState {
    logged: boolean
    data: {
        type: string,
        first_name: string,
        last_name: string,
        email: string
    },
    tokens?: {
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
        }
    }
})

export const { login } = loginSlice.actions

export default loginSlice.reducer