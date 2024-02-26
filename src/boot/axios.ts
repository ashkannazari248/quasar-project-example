import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { LocalStorage } from 'quasar'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const getToken = () => <string>LocalStorage.getItem('token') ?? null
const api = axios.create({ baseURL: '/api/v2' });

api.interceptors.request.use(config => {
  const token = getToken()
  if (token) config.headers.Authorization = token
  return config
}, error => {
  return Promise.reject(error)
})
api.interceptors.response.use(response => {
  return response
}, error => {
  const statusCode = error.response.status
  if (statusCode === 401) {
    LocalStorage.remove('token');
    return;
  }
  return Promise.reject(error)
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});
export { api };
