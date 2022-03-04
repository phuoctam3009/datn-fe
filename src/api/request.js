import axios from 'axios'
import authHeader from '../services/auth-header';

export const baseUrl = "http://localhost:8080/"
// export const baseUrl = "http://192.168.1.71:8080/"

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// Create axios instance
const service = axios.create({
  // The request is configured with the baseURL option in axios, which indicates the public part of the request URL
  baseURL: baseUrl,
  // baseURL: "http://192.168.1.71:8080/",
  // time out
  // timeout: 100000
})
service.interceptors.request.use(config => {
  // Do you need to set a token
  const isToken = authHeader();
  if (isToken) {
    config.headers = isToken // Let each request carry a custom token, please modify it according to the actual situation
  }
  // Get request mapping params parameters
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})


export default service
