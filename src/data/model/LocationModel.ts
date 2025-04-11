export type LocationModel = {
	id: string
	name: string
	address: string
	image: string
	ownerId: string
	area?: AreaModel[]
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
}

export type AreaModel = {
	id: string
	name: string
	locationId: string
}
