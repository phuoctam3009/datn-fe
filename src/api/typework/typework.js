import request, { baseUrl } from "../request.js";
export function listTypeWorks() {
    return request({
        url: "/typework/getAll",
        method: "get",
    });
}