import axios from 'axios/index'
import { getAccessToken } from '@/src/config/storage/SecureStorage'
import { errorLogger, requestLogger, responseLogger } from 'axios-logger'
import { Platform } from 'react-native'

const axiosInstance = axios.create({
	baseURL:
		Platform.OS === 'android'
			? process.env.EXPO_PUBLIC_API_URL_ANDROID || 'http://10.0.2.2:3000/'
			: process.env.EXPO_PUBLIC_API_URL_IOS,
	timeout: 10000,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
})

const loggerConfig = {
	dateFormat: 'HH:MM:ss',
	status: true,
	headers: true,
	data: true,
	prefixText: 'API',
	method: true,
	url: true,
}

axiosInstance.interceptors.request.use(
	async (config) => {
		requestLogger(config, loggerConfig)

		const accessToken = await getAccessToken()
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}
		return config
	},
	(error) => {
		errorLogger(error)
		return Promise.reject(error)
	},
)

axiosInstance.interceptors.response.use(
	(response) => {
		responseLogger(response, loggerConfig)
		return response
	},
	(error) => {
		errorLogger(error)
		return Promise.reject(error)
	},
)

export default axiosInstance
