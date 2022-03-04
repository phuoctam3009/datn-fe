import request, { baseUrl } from "../request.js";
export function listCitys() {
    return request({
        url: "/city/getAll",
        method: "get",
    });
}