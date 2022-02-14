import request from "../request.js";


// Query the list of Invoice history
export function addResume(data) {
    return request({
        url: "/resume/addResume",
        method: "post",
        data: data,
    });
}