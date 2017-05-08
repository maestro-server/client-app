import LocalStorageRepository from '../repositories/localStorage'

export default () => {
  return new LocalStorageRepository().restoreStore()
}
