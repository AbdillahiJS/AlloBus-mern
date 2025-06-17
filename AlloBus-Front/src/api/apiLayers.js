import axios from 'axios'
import { getLocalStorage } from '../helpers/setLocalStorage';

export let getAccessToken=()=>getLocalStorage('connexion')

const axiosParams = {
    
    baseURL: import.meta.env.VITE_API_URL,
  };

  const axiosInstance = axios.create(axiosParams);


  axiosInstance.interceptors.request.use(config => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  });


  const api = (axios) => {

    return {
      get: (url, config = {}) => axios.get(url, config),
      delete: (url, config = {}) => axios.delete(url, config),
      post: (url, body, config = {}) => axios.post(url, body, config),  
      patch: (url, body, config = {}) => axios.patch(url, body, config),
      put: (url, body, config = {}) => axios.put(url, body, config),
    };
    
  };

  export default api(axiosInstance);
  