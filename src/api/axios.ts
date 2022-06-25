import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.0.204:8000/api/v1/';

axios.interceptors.request.use(
  async (config: any) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = 'Token ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axios;
