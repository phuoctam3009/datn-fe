import request, { baseUrl } from "../request.js";

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

export function getRecruitmentReferenceByCompanyId(companyId, recruitmentId) {
    return request({
        url: "/recruitment/reference/company/" + companyId + "/recruitment/" + recruitmentId,
        method: "get",
    })
}

export function getRecruitmentsReference(recruitmentId) {
    return request({
        url: "/recruitment/reference/recruitment/" + recruitmentId,
        method: "get",
    })
}

export function updateStatusRecruitment(query) {
    return request({
        url: "/recruitment/status",
        method: "put",
        params: query
    })
}

export function addCvToRecruitment(query) {
    return request({
        url: "/recruitment/addResume",
        method: "post",
        data: query
    })
}

export function checkCvIsApplied(id) {
    return request({
        url: "/recruitment/checkApply/" + id,
        method: "get",
    })
}

export function getRecruitmentApplied(params) {
    return request({
        url: "/recruitment/applied",
        method: "get",
        params: params
    })
}

export function cancelResume(recruitmentId) {
    return request({
        url: "/recruitment/cancelResume/" + recruitmentId,
        method: "put",
    })
}

export function getRecruitmentByEmployer(params) {
    return request({
        url: "/recruitment/reference",
        method: "get",
        params: params

    })
}

export function deleteRecruitment(recruitmentId) {
    return request({
        url: "/recruitment/delete/" + recruitmentId,
        method: "delete",
    })
}

export function employerUpdateInfo(data) {
    return request({
        url: "/recruitment/employer/updateInfo/",
        method: "put",
        data: data
    })
}

export function employerAddRecruitment(data) {
    return request({
        url: "/recruitment/employer/add/",
        method: "post",
        data: data
    })
}

export function getResumesByRecruitmentId(jobId) {
    return request({
        url: "/recruitment/" + jobId + "/resumes/",
        method: "get",
    })
}