<template>
  <div class="page page-sections">
    <div class="center">
      <v-card class="top-job">
        <div class="header-content">
          <h2 class="box-title">Tin tuyển dụng, việc làm tốt nhất</h2>
        </div>
        <v-row class="is-info-row">
          <v-col
            v-for="(item, index) in listJobHot"
            :key="index"
            cols="12"
            md="4"
            class="info-job"
            style="cursor: pointer"
          >
            <div class="p-info">
              <img class="icon-company" :src="item.company.avatar" />
              <div class="p-info__tool">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <h3 v-bind="attrs" v-on="on" class="text-truncate">
                      <router-link
                        :to="{ name: 'JobDetail', params: { jobId: item.id } }"
                      >
                        {{ item.jobTitle }}
                      </router-link>
                    </h3>
                  </template>
                  <span>{{ item.jobTitle }}</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <router-link
                      :to="{
                        name: 'CompanyDetail',
                        params: { companyId: item.company.id },
                      }"
                    >
                      <span
                        v-bind="attrs"
                        v-on="on"
                        class="d-inline-block text-truncate"
                        style="max-width: 300px"
                      >
                        {{ item.company.companyName }}
                      </span>
                    </router-link>
                  </template>
                  <span>{{ item.company.companyName }}</span>
                </v-tooltip>
              </div>
            </div>

            <v-row no-gutters>
              <v-chip>{{ item.salary }}</v-chip>
              <v-chip>{{ item.city.cityName }}</v-chip>
            </v-row>
          </v-col>
        </v-row>
        <div>
          <v-pagination
            v-model="pageJob"
            :length="totalPagesJob"
            circle
            class="paging is-padding"
          ></v-pagination>
        </div>
      </v-card>
      <v-card class="top-job">
        <div class="header-content">
          <h2 class="box-title">Danh sách công ty</h2>
        </div>
        <v-row class="is-info-row">
          <v-col
            v-for="(item, index) in listCompany"
            :key="index"
            cols="12"
            md="4"
            class="info-job"
            style="cursor: pointer"
          >
            <div class="p-info">
              <img class="icon-company" :src="item.background" />
              <div class="p-info__tool">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <h3 v-bind="attrs" v-on="on" class="text-truncate">
                      <router-link>
                        {{ item.companyName }}
                      </router-link>
                    </h3>
                  </template>
                  <span>{{ item.companyName }}</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <router-link
                      :to="{
                        name: 'CompanyDetail',
                        params: { companyId: item.id },
                      }"
                    >
                      <span
                        v-bind="attrs"
                        v-on="on"
                        class="d-inline-block text-truncate"
                        style="max-width: 300px"
                      >
                        {{ item.companyName }}
                      </span>
                    </router-link>
                  </template>
                  <span>{{ item.companyName }}</span>
                </v-tooltip>
              </div>
            </div>
            <v-row no-gutters>
              <span class="com-desc">{{ item.description }}</span>
            </v-row>
          </v-col>
        </v-row>
        <div>
          <v-pagination
            v-model="pageCom"
            :length="totalPagesCom"
            circle
            class="paging"
          ></v-pagination>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import "particles.js";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

import GlobalMethods from "@/helpers/global-methods";
import Footer from "@/components/main/footer";
import Statistic from "@/components/main/statistic";
import { listRecruitments } from "../api/recruitments/recruitments";
import { getAllCompany, getCompanyActive } from "../api/company/company";

export default {
  name: "Home",
  components: {
    Footer,
    Statistic,
  },
  data() {
    return {
      currentScrollTop: 0,
      pageJob: 1,
      totalPagesJob: 0,
      pageCom: 1,
      totalPagesCom: 0,
      listJobHot: [],
      listCompany: [],
      queryParamsJob: {
        page: 1,
        size: 12,
      },
      queryParamsCom: {
        page: 1,
        size: 12,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.getRecruitments();
      this.getCompanies();
    },
    getRecruitments() {
      listRecruitments(this.queryParamsJob).then((response) => {
        if (response.status == 200) {
          console.log("list recruitment", response.data.content);
          this.listJobHot = response.data.content;
          this.totalPagesJob = response.data.totalPages;
        }
      });
    },
    getCompanies() {
      getCompanyActive(this.queryParamsCom).then((response) => {
        if (response.status == 200) {
          this.listCompany = response.data.content;
          this.totalPagesCom = response.data.totalPages;
          console.log("list company", this.listCompany);
        }
      });
    },
    scrollObserver() {
      window.addEventListener("scroll", () => {
        this.currentScrollTop = document.documentElement.scrollTop;
      });
    },
    handleScrollChange(scrollTop) {
      const sections = document.querySelectorAll(".page-sections section");
      sections.forEach((section) => {
        let offsetTop = section.offsetTop - this.navbarHeight, // decrease navbarHeight
          offsetBottom = offsetTop + section.offsetHeight;

        if (scrollTop >= offsetTop && scrollTop < offsetBottom) {
          let sectionName = section.getAttribute("data-section");
          if (sectionName) {
            this.$store.commit("SET_ACTIVE_SECTION", sectionName);
          }
          // section is visible...
          if (section.getAttribute("data-theme") === "light") {
            if (!this.lightNavbar) {
              this.$store.commit("SET_LIGHT_NAVBAR", true);
            }
          } else {
            if (this.lightNavbar) {
              this.$store.commit("SET_LIGHT_NAVBAR", false);
            }
          }
        }
      });
    },
    detailJob(idJob) {
      router;
    },

    ...GlobalMethods,
  },
  watch: {
    currentScrollTop(top) {
      this.handleScrollChange(top);
    },
    pageJob(value) {
      this.queryParamsJob.page = value ? value : 1;
      this.getRecruitments();
    },
    pageCom(value) {
      this.queryParamsCom.page = value ? value : 1;
      this.getCompanies();
    },
  },

  mounted() {
    this.scrollObserver();
    AOS.init({
      container: document.documentElement,
      once: true,
      easing: "ease",
    });
  },
};
</script>
<style lang="scss" scoped>
section {
  .container {
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;

    &,
    * {
      z-index: 1;
    }
  }

  &.header-section {
    color: white;
  }

  h1 {
    font-size: 4rem;
    font-weight: 300;

    @media (max-width: 960px) {
      text-align: center;
      font-size: 1.7rem;
      line-height: 2.4rem;
      font-weight: 400;
    }
  }

  h2 {
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
    letter-spacing: 1px;
    margin: 16px 0;
    line-height: 1.4;

    @media (max-width: 960px) {
      // text-align: center;
      font-size: 1.3rem;
      font-weight: 300;
    }
  }

  .actions {
    margin-top: 3rem;
    @media (max-width: 960px) {
      margin: 2rem 0;
      width: 100%;
      text-align: center;
      justify-content: center;
    }

    .v-btn {
      @media (min-width: 960px) {
        min-width: 130px;
        min-height: 45px;
      }
    }
  }

  .section-scroll-icon {
    z-index: 2;
    position: absolute;
    bottom: 8%;
    left: 50%;
    transform: translateX(-50%);
  }
}

.center {
  margin: auto;
  width: 75%;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;

  .section-header {
    text-align: center;
    margin-bottom: 72px;

    span {
      color: #c8d0d7;
      font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
      font-size: 12px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
  }
}

h2 {
  font-size: 37px;
  text-align: center;
}

.v-card .v-form {
  max-height: 75px;
}

form {
  color: #fafafa;
}

.top-job {
  margin-top: 30px;

  .header-content {
    padding-top: 10px;
    margin-top: 5px;
    margin-left: 20px;
    margin-bottom: 10px;
    font-size: 20px;
    font-style: bold;
  }
}

.icon-company {
  height: 100px;
  width: 200px;
}

.info-job {
  // border: 0.5px solid;
  margin: 0 10px 20px;
  //margin-bottom: 35px;
  //height: 150px;

  img {
    border-radius: 10px;
  }

  .row {
    margin-bottom: 30px;
    margin-left: 15px;

    .v-chip {
      margin-right: 10px;
    }
  }

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 12px 12px 0 12px;

  &:after {
    display: block;
    content: "";
    border-bottom: solid 3px #00b14f;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
    transform-origin: 0% 50%;
  }

  &:hover:after {
    transform: scaleX(1);
  }
}

.col-md-4 {
  max-width: 31.333333%;
}

.v-sheet {
  margin: 30px 0;
}

.paging > ul {
  margin: 15px 0;
}

.paging {
  padding: 20px 0;

  &.is-padding {
    margin-top: -30px;
  }
}

.v-card__text {
  height: 700px;
  overflow-y: auto;
}

img {
  border-radius: 10px;
}

.row {
  margin-bottom: 10px;

  .v-chip {
    margin-right: 10px;
  }
}

.box-title {
  border-left: 7px solid #00b14f;
  color: #333;
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 16px;
  padding-left: 12px;
  text-align: initial;
}

.specific-job {
  margin-bottom: 10px;
}

.p-info {
  display: flex;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 10px;
  }

  margin-bottom: 5px;
}

.text-truncate {
  max-width: 200px !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.is-info-row {
  margin: 20px 0 20px 0 !important;
  display: flex;
  justify-content: center;
}
.com-desc {
  height: 70px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>