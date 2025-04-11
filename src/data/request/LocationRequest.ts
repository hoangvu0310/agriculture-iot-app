export interface PostLocationRequest {
	name: string
	address: string
	areaName?: string
	setting: {
		capacity: number
		area: number
		disPerRow: number
		disPerHole: number
		fertilizerLevel: number
		totalHole: number
		dripRatePerHole: number
		wateringMode: boolean
	}
	image?: File
}

export interface AddUserToLocationRequest {
	locationId: string
	username: string
	password: string
}

export interface RemoveUserFromLocationRequest {
	locationId: string
	userId: string
}
