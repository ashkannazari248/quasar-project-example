import { apiUrlsConfig, useAxios } from 'src/composables';
import { LocalStorage } from 'quasar';
import { reactive } from 'vue';
import { useAppStore } from 'stores/app-store';


export function useUserUpdate() {
  const appStore = useAppStore();
  const { userData } = appStore;
  const body = reactive({
    first_name: userData.first_name,
    last_name: userData.last_name,
    address: userData.address,
    school: userData.school,
    major_id: userData.major?.id || null,
    grade_id: userData.grade?.id || null,
    gender_id: userData.gender?.id || null,
    shahr_id: userData.shahr?.id || null
  })

  const id = LocalStorage.getItem('id');
  const { responseData, pending, execute } = useAxios({
    ...apiUrlsConfig.updateUser(id),
    data:body
  });
  return {
    responseData,
    pending,
    execute,
    body
  };

}
