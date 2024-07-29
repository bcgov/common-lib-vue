import cloneDeepWith from 'lodash/cloneDeepWith'

export const cloneDeep = (obj) => {
  const newObj = cloneDeepWith(obj, (value) => {
    if (value instanceof Date) {
      return new Date(value.toUTCString())
    }
  })
  return newObj
}
