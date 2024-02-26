import { reactive } from 'vue';
import { apiUrlsConfig, useAxios } from 'src/composables';
import { useAppStore } from 'stores/app-store';
import { LocalStorage } from 'quasar';
import { useRouter } from 'vue-router'
export function useLogin() {
  interface IBody {
    mobile: string;
    password: string;
  }

  const body: IBody = reactive({
    mobile: '',
    password: ''
  });
  const router = useRouter()

  const { responseData, pending, execute } = useAxios({
      ...apiUrlsConfig.login,
      data: body
    },
    {
      onResponse: async (data: {
        data: {
          access_token: string,
          token_type: string,
          token_expires_at: string,
          user: {
            id: number
          }
        }
      }) => {
        LocalStorage.set('token', data.data.token_type + ' ' + data.data.access_token);
        LocalStorage.set('id', data.data.user.id);
        const { fetchUserData } = useAppStore();
        await fetchUserData();
        router.push({ name: 'home' });
      }
    });
  return {
    body,
    responseData,
    pending,
    execute
  };

}
