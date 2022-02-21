import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// Create axios instance
const service = axios.create({
    // The request is configured with the baseURL option in axios, which indicates the public part of the request URL
   baseURL: "http://localhost:8080/",
    // baseURL: "http://192.168.1.71:8080/",
    // time out
    // timeout: 100000
})

export default service
