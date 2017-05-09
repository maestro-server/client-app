import LocalStorageRepository from '../repositories/localStorage'

const getToken = () => new LocalStorageRepository().restoreStore()
export const Authorization = getToken()

export default getToken





