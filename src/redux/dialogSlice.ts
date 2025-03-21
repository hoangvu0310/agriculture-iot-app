import { createSlice } from '@reduxjs/toolkit'

type DialogState = {
	isDialogOpen: boolean
}

const initialState: DialogState = {
	isDialogOpen: false,
}

const dialogSlice = createSlice({
	name: 'dialog',
	initialState,
	reducers: {
		openDialog: (state) => {
			state.isDialogOpen = true
		},
		closeDialog: (state) => {
			state.isDialogOpen = false
		},
	},
})

export const { openDialog, closeDialog } = dialogSlice.actions
export default dialogSlice.reducer
