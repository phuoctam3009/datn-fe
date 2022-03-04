import request, { baseUrl } from "../request.js";
import axios from 'axios'


// Query the list of Invoice history
export function addResume(data) {
    return axios.post(baseUrl + "resume/addResume", data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}

export function getResumes(userId) {
    return request({
        url: "/resume/getResume/" + userId,
        method: "get",
    })
}

export function getResumeById(id) {
    return request({
        url: "/resume/" + id,
        method: "get",
    });
}

export function deleteResumeById(id) {
    return request({
        url: "/resume/delete/" + id,
        method: "delete",
    });
}