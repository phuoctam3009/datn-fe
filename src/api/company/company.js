import request, { baseUrl } from "../request.js";
import axios from 'axios'

export function getCompanyById(id) {
    return request({
        url: "/company/" + id,
        method: "get",
    });
}

export function getAllCompany(query) {
    return request({
        url: "/company/getAll",
        method: "get",
        params: query
    });
}
export function getCompanyActive(query) {
    return request({
        url: "/company/getActive",
        method: "get",
        params: query
    });
}


export function updateStatusCompany(query) {
    return request({
        url: "/company/status",
        method: "put",
        params: query
    })
}

export function getCompanyByUserId(userId) {
    return request({
        url: "/company/user/" + userId,
        method: "get",
    })
}

export function updateProfileCompany(data) {
    return request({
        url: "/company/updateProfile",
        method: "put",
        data: data
    });
}

export function updateAvatarCompany(data) {
    return axios.put(baseUrl + "company/updateAvatar", data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}
export function updateBackgroundCompany(data) {
    return axios.put(baseUrl + "company/updateBg", data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}
