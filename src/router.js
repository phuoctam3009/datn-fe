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
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Profile from './views/Profile.vue';
import ResumeTemplate from './views/resume-template.vue'
import Resume from './views/resume.vue'
import MaterialDark from './resumes/material-dark.vue'
import VueHtml from './views/vue-html2pdf.vue'

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/admin",
      // name: "Dashboard",
      redirect: "/admin/dashboard",
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/dashboard/Index"),
      children: [
        {
          path: "company",
          name: "company",
          component: () =>
            import(/* webpackChunkName: "about" */ "@/views/dashboard/company"),
          meta: { transition: "zoom" }
        },
        {
          path: "dashboard",
          component: () => import("@/views/dashboard/Home")
        },
        {
          path: "recruitment",
          name: "recruitment",
          component: () =>
            import(/* webpackChunkName: "about" */ "@/views/dashboard/recruitment"),
          meta: { transition: "zoom" }
        },
        {
          path: "user",
          name: "User",
          component: () =>
            import(/* webpackChunkName: "about" */ "@/views/dashboard/User"),
          meta: { transition: "zoom" }
        },
        {
          path: "candidate",
          name: "candidate",
          component: () =>
            import(
              /* webpackChunkName: "about" */ "@/views/dashboard/candidate"
            ),
          meta: { transition: "zoom" }
        },
      ]
    },
    {
      path: '/profile',
      redirect: "/profile/candidate",
      component: () =>
        import("@/views/profile/Index"),
      children: [
        {
          path: "employee",
          name: "employee",
          component: () =>
            import(/* webpackChunkName: "about" */ "@/views/profile/ProfileEmployee"),
          meta: { transition: "zoom" }
        },
        {
          path: "dashboard",
          component: () => import("@/views/profile/Home")
        },
        {
          path: "candidate",
          name: "candidate",
          component: () =>
            import(/* webpackChunkName: "about" */ "@/views/profile/candidate/ProfileCandidate"),
          meta: { transition: "zoom" }
        },
      ]
    },
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/test",
      name: "VueHtml",
      component: VueHtml,
    },
    {
      path: "/job-detail/:jobId",
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
      path: "/company",
      name: "CompanyList",
      component: CompanyList,
    },
    {
      path: "/company-detail/:companyId",
      name: "CompanyDetail",
      component: CompanyDetail,
    },
    {
      path: "/add-company",
      name: "AddCompany",
      component: AddCompany,
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/resume',
      component: ResumeTemplate
    },
    {
      path: '/resume/:resumeid',
      name: 'resume',
      component: Resume
    },
    {
      path: '/resume/material-dark/:resumeId',
      name: 'resumeDetail',
      component: MaterialDark
    }
  ],
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');
//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });
