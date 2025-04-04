import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import dialogReducer from './dialogSlice'

export const store = configureStore({
	reducer: {
		dialog: dialogReducer,
		auth: authReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
