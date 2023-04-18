import { createSlice } from "@reduxjs/toolkit";

interface RegistrationForm {
  username: string;
  password: string;
  repeatedPassword: string;
}

const initialState: RegistrationForm = {
  username: "",
  password: "",
  repeatedPassword: "",
};

export const RegistrationForm = createSlice({
  name: "Registration",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      return {
        ...state,
        username: action.payload.username,
      };
    },

    setPassword: (state, action) => {
      return {
        ...state,
        password: action.payload.password,
      };
    },

    setRepeatedPassword: (state, action) => {
      return {
        ...state,
        repeatedPassword: action.payload.repeatedPassword,
      };
    },
  },
});


export const {
    setUsername, setPassword, setRepeatedPassword
} = RegistrationForm.actions;

export default RegistrationForm.reducer;