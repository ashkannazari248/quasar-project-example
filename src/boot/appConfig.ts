import { boot } from 'quasar/wrappers';
import { Loading, LocalStorage } from 'quasar';
import { useAppStore } from 'stores/app-store';

export default boot(async () => {
  if (!LocalStorage.getItem('token')) return;

  Loading.show({
    backgroundColor: 'primary'
  });

  const appStore = useAppStore();
  const { fetchUserData } = appStore;
  await fetchUserData();
  Loading.hide();


});
