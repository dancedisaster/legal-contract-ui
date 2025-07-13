console.log('TESTING HTTP SERVICE');

import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'https://localhost:7041/api';

const http = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
    timeout: 5000
});

http.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const status = error.response.status

      if (status === 401) {
        console.warn('Not authorized')
        // Redirecionar, limpar token, etc.
      } else if (status === 500) {
        console.error('Server error')
      }
    } else {
      console.error('No response from server:', error)
    }

    return Promise.reject(error)
  }
);

export default http
