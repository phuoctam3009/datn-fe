import request from "../request.js";

// Query the list of Invoice history
export function listCandidates(query) {
    return request({
        url: "/candidate/getAll",
        method: "get",
        params: query,
    });
}