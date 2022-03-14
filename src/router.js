import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home.vue";
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
import ResumeTemplate from './views/resume-template.vue'
import Resume from './views/resume.vue'
import MaterialDark from './resumes/material-dark.vue'
import VueHtml from './views/vue-html2pdf.vue'
import store from './store'
import { Role } from "./helpers/role.js"

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/admin",
      // name: "Dashboard",
      redirect: "/admin/company",
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/dashboard/Index"),
      children: [
        {
          path: "company",
          name: "company",
          component: () =>
            import(/* webpackChunkName: "about" */ "@/views/dashboard/company"),
          meta: {
            permission: Role.Admin
          },
        },
        {
          path: "dashboard",
          component: () => import("@/views/dashboard/Home"),
          meta: {
            permission: Role.Admin
          },
        },
        {
          path: "recruitment",
          name: "recruitment",
          component: () =>
            import(/* webpackChunkName: "about" */ "@/views/dashboard/recruitment"),
          meta: {
            permission: Role.Admin
          },
        },
        {
          path: "user",
          name: "User",
          component: () =>
            import(/* webpackChunkName: "about" */ "@/views/dashboard/User"),
          meta: {
            permission: Role.Admin
          },
        },
        {
          path: "candidate",
          name: "candidate",
          component: () =>
            import(
              /* webpackChunkName: "about" */ "@/views/dashboard/candidate"
            ),
          meta: {
            permission: Role.Admin
          },
        },
      ]
    },
    {
      path: '/candidate',
      redirect: "/candidate/profile",
      component: () =>
        import("@/views/profile/Index"),
      children: [
        {
          path: "profile",
          component: () =>
            import(/* webpackChunkName: "about" */ "@/views/profile/candidate/ProfileCandidate"),
          meta: {
            permission: Role.Candidate
          },
        },
        {
          path: "job-apply",
          name: "job-apply",
          component: () =>
            import(/* webpackChunkName: "about" */ "@/views/profile/candidate/JobApply"),
          meta: {
            permission: Role.Candidate
          },
        },
        {
          path: "cv",
          name: "cv",
          component: () =>
            import(/* webpackChunkName: "about" */ "@/views/profile/candidate/cv"),
          meta: {
            permission: Role.Candidate
          },
        },
      ]
    },
    {
      path: '/employer',
      redirect: "/employer/profile",
      component: () => import("@/views/profile/Index"),
      children: [
        {
          path: "profile",
          component: () =>
            import(/* webpackChunkName: "about" */ "@/views/profile/employer/profile"),
          meta: {
            permission: Role.Employer
          },
        },
        {
          path: "recruitment",
          component: () =>
            import(/* webpackChunkName: "about" */ "@/views/profile/employer/recruitment"),
          meta: {
            permission: Role.Employer
          },
        },
        {
          path: "candidates",
          component: () =>
            import(/* webpackChunkName: "about" */ "@/views/profile/employer/candidates"),
          meta: {
            permission: Role.Employer
          },
        },
        // {
        //   path: "job-apply",
        //   name: "job-apply",
        //   component: () =>
        //     import(/* webpackChunkName: "about" */ "@/views/profile/candidate/JobApply"),
        //   meta: { transition: "zoom" }
        // },
        // {
        //   path: "cv",
        //   name: "cv",
        //   component: () =>
        //     import(/* webpackChunkName: "about" */ "@/views/profile/candidate/cv"),
        //   meta: { transition: "zoom" }
        // },
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
      path: "/job",
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
      path: '/resume/:typeResume/:resumeId(\\d+)?',
      name: 'resume',
      component: Resume
    },
    {
      path: '/resume/material-dark/:resumeId',
      name: 'resumeDetail',
      component: MaterialDark,
    },
    {
      path: "/404",
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/error/404"),
    },
    {
      path: "/401",
      component: (resolve) => require(["@/views/error/401"], resolve),
    },
    {
      path: "*",
      redirect: '/404'
    },
  ],
});

router.beforeEach((to, from, next) => {
  const permissionRoute = to.meta.permission;
  const loggedIn = store.state.auth.status.loggedIn;
  const user = store.state.auth.user;
  if (permissionRoute) {
    if (loggedIn) {
      if (user.roles.includes(permissionRoute)) {
        next();
      } else {
        // localStorage.removeItem('user');
        next("/401");
      }
    } else {
      next("/login");
    }
  }

  const publicPages = ['/login', '/register'];
  if (publicPages.includes(to.path) && loggedIn) {
    next('/');
  } else {
    next();
  }


})

export default router;
