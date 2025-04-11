import { LocationModel } from '@/src/data/model/LocationModel'
import { Result, runAsynchronousCall } from '../result/Result'
import axiosClient from '@/src/config/api/api.config'
import { APIS } from '@/src/constants'
import { GetLocationResponse } from '@/src/data/response/LocationResponse'
import { PostLocationRequest } from '@/src/data/request/LocationRequest'

export default class LocationService {
	public static async getLocation(): Promise<Result<LocationModel[]>> {
		return await runAsynchronousCall<GetLocationResponse, LocationModel[]>(
			() =>
				axiosClient
					.get(APIS.Location.GetLocation, {})
					.then((res) => GetLocationResponse.fromJson(res.data)),
			(response) => response.locationList,
		)
	}

	public static async createLocation(
		createLocationRequest: PostLocationRequest,
	): Promise<Result<LocationModel>> {
		const formData = LocationService.appendFormData(createLocationRequest)

		return await runAsynchronousCall<LocationModel, LocationModel>(
			() =>
				axiosClient
					.post(APIS.Location.GetLocation, formData, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					})
					.then((res) => res.data),
			(response) => response,
		)
	}

	public static async updateLocation(
		updateLocationRequest: PostLocationRequest,
		locationId: string,
	): Promise<Result<LocationModel>> {
		const formData = LocationService.appendFormData(updateLocationRequest)

		return await runAsynchronousCall<LocationModel, LocationModel>(
			() =>
				axiosClient
					.patch(APIS.Location.UpdateLocation + locationId, formData, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
						params: {
							id: locationId,
						},
					})
					.then((res) => res.data),
			(response) => response,
		)
	}

	public static async deleteLocation(locationId: string): Promise<Result<LocationModel>> {
		return await runAsynchronousCall<LocationModel, LocationModel>(
			() => axiosClient.delete(APIS.Location.DeleteLocation + locationId).then((res) => res.data),
			(response) => response,
		)
	}

	private static appendFormData(createLocationRequest: PostLocationRequest): FormData {
		const formData = new FormData()
		formData.append('name', createLocationRequest.name)
		formData.append('address', createLocationRequest.address)
		if (createLocationRequest.areaName) {
			formData.append('areaName', createLocationRequest.areaName)
		}
		formData.append('setting', JSON.stringify(createLocationRequest.setting))
		if (createLocationRequest.image) {
			formData.append('image', createLocationRequest.image)
		}

		return formData
	}
}
