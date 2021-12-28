import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home.vue";
import JobList1 from "./views/position/job-list-1.vue";
import JobDetail from "./views/job-detail.vue";

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
  ],
});
