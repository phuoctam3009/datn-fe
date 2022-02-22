import request from "../request.js";

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