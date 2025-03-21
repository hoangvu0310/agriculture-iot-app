import { AuthorizedModel } from '@/src/data/model/AuthorizedModel'

export default class AuthResponse {
	userId: string
	token: string
	type: string
	role: string
	refreshToken: string
	issuedAt: Date
	expireAt: Date

	constructor({ userId, token, type, role, refreshToken, issuedAt, expireAt }: AuthResponse) {
		this.userId = userId
		this.token = token
		this.type = type
		this.role = role
		this.refreshToken = refreshToken
		this.issuedAt = issuedAt
		this.expireAt = expireAt
	}

	static fromJson(data: any): AuthResponse {
		return new AuthResponse(<AuthResponse>{
			userId: data.userId,
			token: data.token,
			type: data.type,
			role: data.role,
			refreshToken: data.refreshToken,
			issuedAt: new Date(data.issuedAt),
			expireAt: new Date(data.expireAt),
		})
	}

	toModel(): AuthorizedModel {
		return {
			userId: this.userId,
			role: this.role,
			token: this.token,
			refreshToken: this.refreshToken,
		}
	}
}
