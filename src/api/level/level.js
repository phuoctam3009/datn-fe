import request, { baseUrl } from "../request.js";
export function listLevels() {
    return request({
        url: "/level/getAll",
        method: "get",
    });
}