import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthRequest } from '@/src/data/request/AuthRequest'
import AuthService from '@/src/data/service/AuthService'
import { AuthorizedModel } from '@/src/data/model/AuthorizedModel'
import { SuccessResult } from '@/src/data/result/Result'
import {
	saveAccessToken,
	savePassword,
	saveRefreshToken,
	saveUserId,
	saveUsername,
} from '@/src/config/storage/SecureStorage'

type AuthState = {
	authorizedModel: AuthorizedModel
	isLoading: boolean
	error: string | null
	success: string | null
}

export const signIn = createAsyncThunk<AuthorizedModel, AuthRequest, { rejectValue: string }>(
	'auth/signin',
	async (request, { rejectWithValue }) => {
		return handleAuth(AuthService.signIn, request, rejectWithValue)
	},
)

export const signUp = createAsyncThunk<AuthorizedModel, AuthRequest, { rejectValue: string }>(
	'auth/signup',
	async (request, { rejectWithValue }) => {
		return handleAuth(AuthService.signUp, request, rejectWithValue)
	},
)

const handleAuth = async (
	authFunction: (
		request: AuthRequest,
	) => Promise<SuccessResult<AuthorizedModel> | { error: { message: string } }>,
	request: AuthRequest,
	rejectWithValue: (value: string) => any,
) => {
	const res = await authFunction(request)

	if (res instanceof SuccessResult) {
		const data = res.data
		await Promise.all([
			saveAccessToken(data.token),
			saveRefreshToken(data.refreshToken),
			saveUsername(request.username),
			savePassword(request.password),
			saveUserId(data.userId),
		])
		return data
	} else {
		return rejectWithValue(res.error.message)
	}
}

const initialAuthState: AuthState = {
	authorizedModel: {
		userId: '',
		token: '',
		role: '',
		refreshToken: '',
	},
	isLoading: false,
	error: null,
	success: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState: initialAuthState,
	reducers: {
		resetState: (state) => {
			state.authorizedModel = {
				userId: '',
				token: '',
				role: '',
				refreshToken: '',
			}
			state.isLoading = false
			state.error = null
			state.success = null
		},
	},
	extraReducers: (builder) => {
		// Sign In
		builder.addCase(signIn.pending, (state) => {
			state.isLoading = true
			state.error = null
			state.success = null
		})
		builder.addCase(signIn.fulfilled, (state, action) => {
			state.authorizedModel = action.payload
			state.isLoading = false
			state.error = null
			state.success = 'success.signIn'
		})
		builder.addCase(signIn.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.payload || null
			state.success = null
		})
		// Sign up
		builder.addCase(signUp.pending, (state) => {
			state.isLoading = true
			state.error = null
			state.success = null
		})
		builder.addCase(signUp.fulfilled, (state, action) => {
			state.authorizedModel = action.payload
			state.isLoading = false
			state.error = null
			state.success = 'success.signUp'
		})
		builder.addCase(signUp.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.payload || null
			state.success = null
		})
	},
})

export const { resetState } = authSlice.actions
export default authSlice.reducer
