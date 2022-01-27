import request from "../request.js";

// Query the list of Invoice history
export function listRecruitments(query) {
    return request({
        url: "/recruitment/getAll",
        method: "get",
        params: query,
    });
}

export function getRecruitmentById(id) {
    return request({
        url: "/recruitment/" + id,
        method: "get",
    });
}