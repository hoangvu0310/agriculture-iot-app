import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import dialogReducer from './dialogSlice'
import locationReducer from './locationSlice'

export const store = configureStore({
	reducer: {
		dialog: dialogReducer,
		auth: authReducer,
		location: locationReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
