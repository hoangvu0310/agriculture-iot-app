import { AppError, CommonError, handleError, NetworkError } from '@/src/data/error/AppError'
import checkConnection from '@/src/utils/CheckConnection'
import { AxiosError } from 'axios'

export type Result<T> = Success<T> | Error

export class Success<T> {
	constructor(public data: T) {}
}

export class Error {
	constructor(public error: AppError) {}
}

export async function runAsynchronousCall<T, E>(
	request: () => Promise<T>,
	map: (response: T) => E,
): Promise<Result<E>> {
	const isConnected = await checkConnection()
	if (!isConnected) {
		return new Error(new NetworkError())
	}

	try {
		const response = await request()
		return new Success(map(response))
	} catch (error) {
		if (error instanceof AxiosError) {
			return new Error(handleError(error))
		}
		return new Error(new CommonError())
	}
}
