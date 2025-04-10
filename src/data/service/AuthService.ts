import AuthResponse from '@/src/data/response/AuthResponse'
import { AuthRequest } from '@/src/data/request/AuthRequest'
import axiosClient from '@/src/config/api/api.config'
import { Result, runAsynchronousCall } from '@/src/data/result/Result'
import { AuthorizedModel } from '@/src/data/model/AuthorizedModel'
import { APIS } from '@/src/constants'

export default class AuthService {
	public static async signIn(authRequest: AuthRequest): Promise<Result<AuthorizedModel>> {
		return await runAsynchronousCall<AuthResponse, AuthorizedModel>(
			() =>
				axiosClient
					.post(APIS.Auth.SignIn, JSON.stringify(authRequest))
					.then((res) => AuthResponse.fromJson(res.data)),
			(response) => response.toModel(),
		)
	}

	public static async signUp(authRequest: AuthRequest): Promise<Result<AuthorizedModel>> {
		return await runAsynchronousCall<AuthResponse, AuthorizedModel>(
			() =>
				axiosClient
					.post(APIS.Auth.SignUp, JSON.stringify(authRequest))
					.then((res) => AuthResponse.fromJson(res.data)),
			(response) => response.toModel(),
		)
	}
}
