import { LocationModel } from '@/src/data/model/LocationModel'

export class GetLocationResponse {
	locationList: LocationModel[]

	constructor(locationList: LocationModel[]) {
		this.locationList = locationList
	}

	static fromJson(data: any): GetLocationResponse {
		const locationList: LocationModel[] = data
		return new GetLocationResponse(locationList)
	}
}
