import axios from 'axios'

export const axiosi = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL || 'https://e-commerce-5rkc.onrender.com'
})

// Add request interceptor to include token from localStorage
axiosi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)