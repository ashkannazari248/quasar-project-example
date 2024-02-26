import { useQuasar } from 'quasar'

export function useDialog () {
  const $q = useQuasar()

  const loadComponent = async path => {
    const component = await path

    return component.default
  }

  const customDialog = config => {
    return $q.dialog(
      {
        ...config,
        componentProps: {
          ...config.componentProps
        }
      })
  }

  return {
    customDialog,
    loadComponent
  }
}
