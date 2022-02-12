import request from "../request.js";

export function getCompanyById(id) {
    return request({
        url: "/company/" + id,
        method: "get",
    });
}