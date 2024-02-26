import { defineStore } from 'pinia';
import { useUserInfo } from 'src/composables/modules/userInfo';


export interface IUser {
  id: number;
  first_name: string | null;
  last_name: string | null;
  address: string | null;
  school: string | null;
  major: IMajor | null;
  grade: IGrade | null;
  gender: IGender | null;
  shahr: IShahr | null;
}
export interface IMajor {
  id: number;
  name: string;
  title: string;
  selected: boolean;
}
export interface IGrade {
  id: number;
  name: string;
  title: string;
}
export interface IGender{
  id: number;
  name: string;
  title: string;
}
export interface IShahr{
  id: number,
  title: string,
  ostan: {
    id: number,
    title: string,
    amar_code: number
  }
}
export const useAppStore = defineStore('appStore', {
  state: () => ({
    userData: <IUser>{}
  }),
  getters: {},
  actions: {
    async fetchUserData() {
      const { responseData, execute } = useUserInfo();
      await execute();
      this.userData = responseData.value.data as IUser;
      return responseData;
    }
  }
});
