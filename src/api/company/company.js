import request from "../request.js";

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

export function updateStatusCompany(query) {
    return request({
        url: "/company/status",
        method: "put",
        params: query
    })
}