import { createSlice } from "@reduxjs/toolkit";

interface User {
  chattingWithID: number;
  chattingWithUsername: string;
  chatOpen: boolean;
  chatroomID: string;
  chatRooms: {friendId: number, roomId: string}[]
}

const initialState: User = {
  chattingWithID: -1,
  chatOpen: false,
  chattingWithUsername: "",
  chatroomID: "",
  chatRooms: []
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setChatProperties: (
      state,
      action: {
        payload: {
          id: number;
          chatOpen: boolean;
          username: string;
          chatRoomID: string
        };
      }
    ) => {
      return {
        ...state,
        chattingWithID: action.payload.id,
        chatOpen: action.payload.chatOpen,
        chattingWithUsername: action.payload.username,
        chatroomID: action.payload.chatRoomID
        
      };
    },

    setChatRooms: (state, action: {
        payload:{ 
        rooms: {
          friendId: number,
          roomId: string  
        }[]
    }
    }) => {
        return{
            ...state,
            chatRooms: action.payload.rooms
        }
    }
  },
});

export const { setChatProperties, setChatRooms } = userSlice.actions;

export default userSlice.reducer;
