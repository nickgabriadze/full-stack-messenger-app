import { configureStore } from '@reduxjs/toolkit'
import RegistrationForm from './features/registration'
import loginSlice from './features/loginSlice'
import userSlice from './features/userSlice'

export const store = configureStore({
  reducer: {
    registration: RegistrationForm,
    login: loginSlice,
    user: userSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch