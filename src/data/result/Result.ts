import { AppError, CommonError, handleError, NetworkError } from '@/src/data/error/AppError'
import checkConnection from '@/src/utils/CheckConnection'
import { AxiosError } from 'axios'

export type ApiResult<T> = SuccessResult<T> | ErrorResult

export class SuccessResult<T> {
	constructor(public data: T) {}
}

export class ErrorResult {
	constructor(public error: AppError) {}
}

export async function runAsynchronousCall<T, E>(
	request: () => Promise<T>,
	map: (response: T) => E,
): Promise<ApiResult<E>> {
	const isConnected = await checkConnection()
	if (!isConnected) {
		return new ErrorResult(new NetworkError())
	}

	try {
		const response = await request()
		return new SuccessResult(map(response))
	} catch (error) {
		if (error instanceof AxiosError) {
			return new ErrorResult(handleError(error))
		}
		return new ErrorResult(new CommonError())
	}
}
