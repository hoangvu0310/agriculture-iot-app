import { AxiosError } from 'axios/index'

export abstract class AppError extends Error {
	protected constructor(message: string) {
		super(message)
		this.message = message
	}

	public message: string
}

export class CommonError extends Error {
	constructor() {
		super('error.commonError')
	}
}

export class NetworkError extends AppError {
	constructor() {
		super('error.networkError')
	}
}

export class ServerError extends AppError {
	constructor() {
		super('error.serverError')
	}
}

export class ApiCallError extends AppError {
	constructor(responseMessage: string | string[]) {
		if (typeof responseMessage === 'string') {
			responseMessage = responseMessage.toLowerCase()
		} else {
			responseMessage = responseMessage.join(',')
		}
		let errorMessage: string
		if (responseMessage.includes('user') || responseMessage.includes('password')) {
			errorMessage = 'error.signInError'
		} else {
			switch (responseMessage) {
				case 'Duplicate entry':
					errorMessage = 'error.duplicateError'
					break
				default:
					errorMessage = 'error.commonError'
			}
		}

		// switch (responseMessage) {
		// 	case 'NOTFOUND':
		// 		errorMessage = 'error.loginError'
		// 		break
		// 	case 'Unauthorized':
		// 		errorMessage = 'error.loginError'
		// 		break
		// 	case 'Bad Request':
		// 		errorMessage = 'error.loginError'
		// 		break
		// 	case 'DUPLICATE':
		// 		errorMessage = 'error.duplicateError'
		// 		break
		// 	default:
		// 		errorMessage = 'error.commonError'
		// }
		super(errorMessage)
		this.errorMessage = errorMessage
	}

	public errorMessage: string
}

export function handleError(error: any): AppError {
	if (error instanceof AxiosError) {
		if (error.response && error.response.data) {
			const responseErrorMessage = error.response.data.message
			return new ApiCallError(responseErrorMessage)
		} else if (error.request) {
			return new ServerError()
		}
		return new CommonError()
	}
	return new CommonError()
}
