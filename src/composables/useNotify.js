import { Notify } from 'quasar'

export function useNotify () {
  const notify = Notify
  const types = new Map()
  const positive = {
    color: 'green-1',
    message: 'با موفقیت انجام شد',
    iconSize: '20px',
    textColor: 'green-8',
    timeout: 2000,
    html: false,
    group: false
  }
  const negative = {
    color: 'red-1',
    message: 'با موفقیت انجام شد',
    iconSize: '20px',
    textColor: 'red-8',
    timeout: 2000,
    html: false,
    group: false
  }
  const warning = {
    color: 'yellow-1',
    message: 'با موفقیت انجام شد',
    classes: 'full-width',
    iconSize: '20px',
    textColor: 'yellow-8',
    timeout: 2000,
    html: false,
    group: false
  }

  types.set('positive', positive)
  types.set('negative', negative)
  types.set('warning', warning)

  types.forEach((value, key) => notify.registerType(key, value))

  return { notify }
}
