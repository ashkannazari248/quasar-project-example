import { ref } from 'vue';
import { Notify } from 'quasar';

import { api } from 'boot/axios';
import { useNotify } from 'src/composables';

export const apiUrlsConfig = {
  login: {
    url: '/login',
    method: 'post'
  },
  getUserInfo: (id)=>({
    url: `/user/${id}`,
    method: 'get'
  }),
  updateUser: (id)=>({
    url: `/user/${id}`,
    method: 'put'
  }),
  getUserFormData: {
    url: '/megaroute/getUserFormData',
    method: 'get'
  }
};

export function useAxios(axiosConfig, options = {}) {
  const { notify } = useNotify();
  const {
    onResponse=null,
    showErrorNotify = true,
    showSuccessNotify = true,
    notifyErrorMessage = 'خطا مجددا تلاش نمایید',
    notifySuccessMessage = 'با موفقیت انجام شد'
  } = options;

  const pending = ref(false);
  const responseData = ref({data:{}});

  const execute = async (reqConfig = axiosConfig) => {
    pending.value = true;

    try {
      const { data, config } = await api(reqConfig);
      if (onResponse)
        await onResponse(data);
      responseData.value = data;


      if (showSuccessNotify && ['post', 'put', 'patch'].includes(config.method)) {
        notify.create({
          type: 'positive',
          message: notifySuccessMessage
        });
      }

      return Promise.resolve(data);
    } catch (error) {
      console.log('error',error);
      if (showErrorNotify) {
        let message = notifyErrorMessage;

        if (error.response?.data?.errors && Object.values(error.response.data.errors).length) {
          message = Object.values(error.response.data.errors).map(el => el).join('<br>');
        }
        Notify.create({
          type: 'negative',
          html: true,
          message: message
        });
      }

      return Promise.reject(error);
    } finally {
      pending.value = false;
    }
  };

  return {
    pending,
    execute,
    responseData
  };
}
