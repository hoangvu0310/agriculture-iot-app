import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LocationModel } from '@/src/data/model/LocationModel'
import LocationService from '@/src/data/service/LocationService'
import { SuccessResult } from '@/src/data/result/Result'
import { PostLocationRequest } from '@/src/data/request/LocationRequest'

type LocationState = {
	locationList: LocationModel[]
	isLoading: boolean
	error: string | null
	success: string | null
}

const initialLocationState: LocationState = {
	locationList: [],
	isLoading: false,
	error: null,
	success: null,
}

export const getLocation = createAsyncThunk<LocationModel[], void, { rejectValue: string }>(
	'location',
	async (_, { rejectWithValue }) => {
		const res = await LocationService.getLocation()
		if (res instanceof SuccessResult) {
			return res.data
		} else {
			return rejectWithValue(res.error.message)
		}
	},
)

export const createLocation = createAsyncThunk<
	LocationModel,
	PostLocationRequest,
	{ rejectValue: string }
>('location/create', async (request, { rejectWithValue }) => {
	const res = await LocationService.createLocation(request)
	if (res instanceof SuccessResult) {
		return res.data
	} else {
		return rejectWithValue(res.error.message)
	}
})

export const updateLocation = createAsyncThunk<
	LocationModel,
	{ request: PostLocationRequest; locationId: string },
	{ rejectValue: string }
>('location/update', async ({ request, locationId }, { rejectWithValue }) => {
	const res = await LocationService.updateLocation(request, locationId)
	if (res instanceof SuccessResult) {
		return res.data
	} else {
		return rejectWithValue(res.error.message)
	}
})

export const deleteLocation = createAsyncThunk<LocationModel, string, { rejectValue: string }>(
	'location/delete',
	async (locationId, { rejectWithValue }) => {
		const res = await LocationService.deleteLocation(locationId)
		if (res instanceof SuccessResult) {
			return res.data
		} else {
			return rejectWithValue(res.error.message)
		}
	},
)

const locationSlice = createSlice({
	name: 'location',
	initialState: initialLocationState,
	reducers: {},
	extraReducers: (builder) => {
		const addPendingCase = (thunk) => {
			builder.addCase(thunk.pending, (state) => {
				state.isLoading = true
				state.error = null
				state.success = null
			})
		}

		// Helper function for rejected state
		const addRejectedCase = (thunk) => {
			builder.addCase(thunk.rejected, (state, action) => {
				state.isLoading = false
				state.success = null
				state.error = action.payload || null
			})
		}

		// Apply to all thunks
		;[getLocation, createLocation, updateLocation, deleteLocation].forEach((thunk) => {
			addPendingCase(thunk)
			addRejectedCase(thunk)
		})

		// Then handle the fulfilled cases individually
		builder.addCase(getLocation.fulfilled, (state, action) => {
			state.locationList = action.payload
			state.isLoading = false
			state.error = null
			state.success = null
		})

		builder.addCase(createLocation.fulfilled, (state, action) => {
			state.locationList = [...state.locationList, action.payload]
			state.isLoading = false
			state.error = null
			state.success = 'success.createLocation'
		})

		builder.addCase(updateLocation.fulfilled, (state, action) => {
			const updatedLocation = action.payload
			const index = state.locationList.findIndex((loc) => loc.id === updatedLocation.id)
			if (index !== -1) {
				state.locationList[index] = updatedLocation
			}
			state.isLoading = false
			state.error = null
			state.success = 'success.updateLocation'
		})

		builder.addCase(deleteLocation.fulfilled, (state, action) => {
			state.locationList = state.locationList.filter((item) => item.id !== action.payload.id)
			state.isLoading = false
			state.error = null
			state.success = 'success.deleteLocation'
		})
	},
})

export default locationSlice.reducer
