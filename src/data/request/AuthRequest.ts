export interface AuthRequest {
	username: string
	password: string
}

export interface AuthenticatedRequest {
	userId: string
	role: string
}
