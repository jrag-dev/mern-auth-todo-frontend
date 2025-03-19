import axios from 'axios';

export const instanceAxios = axios.create(
  {
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
    timeout: 5000
  }
)