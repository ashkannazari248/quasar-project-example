import { apiUrlsConfig, useAxios } from 'src/composables';
import { LocalStorage } from 'quasar';

export function useUserInfo() {
  const id = LocalStorage.getItem('id');
  const { responseData, pending, execute } = useAxios({
    ...apiUrlsConfig.getUserInfo(id)
  });
  return {
    responseData,
    pending,
    execute
  };

}
