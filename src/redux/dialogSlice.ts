import { createSlice } from '@reduxjs/toolkit'

type DialogState = {
	isDialogOpen: boolean
}

const initialDialogState: DialogState = {
	isDialogOpen: false,
}

const dialogSlice = createSlice({
	name: 'dialog',
	initialState: initialDialogState,
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
