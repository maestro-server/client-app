import LocalStorageRepository from '../repositories/localStorage'

const getToken = () => new LocalStorageRepository().restoreStore()

export const Authorization = `JWT ${getToken()}`

export default getToken
