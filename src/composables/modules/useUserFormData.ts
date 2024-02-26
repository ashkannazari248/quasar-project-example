import { apiUrlsConfig, useAxios } from 'src/composables';
import { Ref } from 'vue';

interface IUserFormData {
  provinces: IProvince[];
  cities: ICity[];
  majors: IMajor[];
  grades: IGrade[];
  genders: IGrade[];
}
interface IGrade {
  id: number;
  name: string;
  title: string;
}
interface IMajor {
  id: number;
  name: string;
  title: string;
  selected: boolean;
}
interface ICity {
  id: number;
  title: string;
  province: IProvince;
}
interface IProvince {
  id: number;
  title: string;
}
export function useUserFormData() {
  const { responseData, pending, execute } = useAxios({
    ...apiUrlsConfig.getUserFormData
  });
  return {
    responseData : responseData as Ref<{data:IUserFormData}>,
    pending,
    execute
  };

}
