import request from "../request.js";
import axios from 'axios'


// Query the list of Invoice history
export function addResume(data) {
    return axios.post("http://localhost:8080/resume/addResume", data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}