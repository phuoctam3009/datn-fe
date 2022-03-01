import request from "../request.js";
import axios from 'axios'


// Query the list of Invoice history
export function listCandidates(query) {
    return request({
        url: "/candidate/getAll",
        method: "get",
        params: query,
    });
}

export function getCandidateById(id) {
    return request({
        url: "/candidate/" + id,
        method: "get",
    });
}

export function updateProfileCandidate(data) {
    return request({
        url: "/candidate/updateProfile",
        method: "put",
        data: data
    });
}

export function updateAvatar(data) {
    return axios.put("http://localhost:8080/candidate/updateAvatar", data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}