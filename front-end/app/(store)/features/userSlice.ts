import { createSlice } from "@reduxjs/toolkit"

interface User{
    chattingWithID: number,
    chattingWithUsername: string,
    chatOpen: boolean,
    
}

const initialState:User ={
    chattingWithID: -1,
    chatOpen: false,
    chattingWithUsername: ""
}

export const userSlice = createSlice({
    name:"User",
    initialState,
    reducers:{
        setChatProperties: (state, action:{payload: {
            id: number, 
            chatOpen: boolean,
            username: string
        }}) => {
            return {
                ...state,
                chattingWithID: action.payload.id,
                chatOpen: action.payload.chatOpen,
                chattingWithUsername: action.payload.username
            }
        }
    } 
})

export const {setChatProperties} = userSlice.actions;

export default userSlice.reducer;