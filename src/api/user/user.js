import request from "../request.js";

// Query the list of Invoice history
export function listUsers(query) {
    return request({
        url: "/user/getAll",
        method: "get",
        params: query,
    });
}

export function getUser(userId) {
    return request({
        url: "/user/" + userId,
        method: "get",
    });
}

export function deleteUser(userId) {
    return request({
        url: "/user/delete/" + userId,
        method: "delete",
    })
}

export function updateInfo(payload) {
    return request({
        url: "/user/updateInfo",
        method: "put",
        data: payload
    })
}