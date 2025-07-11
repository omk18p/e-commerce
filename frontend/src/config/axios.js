import axios from 'axios'

export const axiosi = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL || 'https://e-commerce-5rkc.onrender.com'
})