import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home.vue";
import JobList1 from "./views/position/job-list-1.vue";
import JobDetail from "./views/job-detail.vue";
import ApplyJob from "./views/apply-job.vue";
import AddJob from "./views/add-job.vue";
import ManageJob from "./views/job-manage.vue";
import ManageResume from "./views/resume-manage.vue";
import CompanyList from "./views/company-list.vue";
import CompanyDetail from "./views/company-detail.vue";
import AddCompany from "./views/add-company.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/test",
      name: "JobList1",
      component: JobList1,
    },
    {
      path: "/job-detail",
      name: "JobDetail",
      component: JobDetail,
    },
    {
      path: "/apply-job",
      name: "ApplyJob",
      component: ApplyJob,
    },
    {
      path: "/add-job",
      name: "AddJob",
      component: AddJob,
    },
    {
      path: "/job-manage",
      name: "ManageJob",
      component: ManageJob,
    },
    {
      path: "/resume-manage",
      name: "ManageResume",
      component: ManageResume,
    },
    {
      path: "/company-list",
      name: "CompanyList",
      component: CompanyList,
    },
    {
      path: "/company-detail",
      name: "CompanyDetail",
      component: CompanyDetail,
    },
    {
      path: "/add-company",
      name: "AddCompany",
      component: AddCompany,
    },
  ],
});
