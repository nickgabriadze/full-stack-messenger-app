import { createSlice } from "@reduxjs/toolkit";


interface LogIn{
    username: string,
    password: string
}

const initialState = {
    username: "",
    password: ""
}


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            return{ 
                ...state,
                username: action.payload.username
            }
        },

        setPassword: (state, action) => {
            return{
                ...state,
                password: action.payload.password
            }
        }
    }
})

export const {setUsername, setPassword} = loginSlice.actions;
export default loginSlice.reducer;