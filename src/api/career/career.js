import request, { baseUrl } from "../request.js";
export function listCareers() {
    return request({
        url: "/career/getAll",
        method: "get",
    });
}