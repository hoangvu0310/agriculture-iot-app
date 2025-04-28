import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'

const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'
const USERNAME = 'username'
const PASSWORD = 'password'
const USER_ID = 'user_id'

export async function saveAccessToken(value: string) {
	await setItemAsync(ACCESS_TOKEN, value)
}

export async function getAccessToken() {
	return await getItemAsync(ACCESS_TOKEN)
}

export async function saveRefreshToken(value: string) {
	await setItemAsync(REFRESH_TOKEN, value)
}

export async function getRefreshToken() {
	return await getItemAsync(REFRESH_TOKEN)
}

export async function saveUsername(value: string) {
	await setItemAsync(USERNAME, value)
}

export async function getUsername() {
	return await getItemAsync(USERNAME)
}

export async function savePassword(value: string) {
	await setItemAsync(PASSWORD, value)
}

export async function getPassword() {
	return await getItemAsync(PASSWORD)
}

export async function saveUserId(value: string) {
	await setItemAsync(USER_ID, value)
}

export async function getUserId() {
	return await getItemAsync(USER_ID)
}

export async function deleteAllCredentials() {
	await Promise.all([
		deleteItemAsync(ACCESS_TOKEN),
		deleteItemAsync(REFRESH_TOKEN),
		deleteItemAsync(USERNAME),
		deleteItemAsync(PASSWORD),
		deleteItemAsync(USER_ID),
	])
}
