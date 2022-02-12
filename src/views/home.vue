<template>
  <div class="page page-sections">
    <v-card class="mx-auto card-filter">
      <v-form v-model="valid" style="border: 1px solid">
        <v-container>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                style="margin-top: -12px"
                label="Tên công việc, vị trí muốn ứng tuyển"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-select
                style="margin-top: -7px"
                label="Trình độ"
                dense
                outlined
                clearable
                :menu-props="{ top: false, offsetY: true }"
              ></v-select>
            </v-col>

            <v-col cols="12" md="3">
              <v-select
                style="margin-top: -7px"
                v-model="test"
                :items="itemCategories"
                label="Thành phố"
                dense
                outlined
                clearable
                :menu-props="{ top: false, offsetY: true }"
              ></v-select>
            </v-col>
            <v-col cols="12" md="3" style="margin-top: -7px">
              <v-btn style="margin-right: 20px" color="green">Tìm kiếm</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    <div class="center">
      <v-card class="top-job">
        <div class="header-content">
          <span>Tin tuyển dụng, việc làm tốt nhất</span>
        </div>
        <v-row>
          <v-col
            v-for="(item, index) in listJobHot"
            :key="index"
            cols="12"
            md="4"
            class="info-job"
          >
            <img class="icon-company" :src="item.company.avatar" />
            <v-col>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <h3 v-bind="attrs" v-on="on" class="text-truncate">
                    <router-link
                      :to="{ name: 'JobDetail', params: { jobId: item.id } }"
                      target="_blank"
                    >
                      {{ item.jobTitle }}
                    </router-link>
                  </h3>
                </template>
                <span>{{ item.jobTitle }}</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <route-link
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
                  </route-link>
                </template>
                <span>{{ item.company.companyName }}</span>
              </v-tooltip>
            </v-col>

            <v-row>
              <v-chip>10-15 triệu</v-chip>
              <v-chip>Remote</v-chip>
            </v-row>
          </v-col>
        </v-row>
        <div>
          <v-pagination
            v-model="page"
            :length="totalPages"
            circle
            class="paging"
          ></v-pagination>
        </div>
      </v-card>

      <v-sheet class="mx-auto" elevation="8" max-width="1140">
        <v-slide-group
          v-model="model"
          class="pa-4"
          active-class="success"
          show-arrows
        >
          <!-- Ads job -->
          <v-slide-item v-for="n in 15" :key="n" v-slot="{ active, toggle }">
            <v-card
              :color="active ? undefined : 'grey lighten-1'"
              class="ma-3"
              height="200"
              width="305"
              @click="toggle"
            >
              <v-row class="fill-height" align="center" justify="center">
                <v-scale-transition>
                  <v-icon v-if="active" color="white" size="30"></v-icon>
                </v-scale-transition>
              </v-row>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
      <v-row>
        <v-col>
          <v-card :loading="loading" class="mx-auto my-12" max-width="374">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-card-title>Việc làm lương cao</v-card-title>

            <v-card-text>
              <div v-for="index in 10" :key="index" class="specific-job">
                <v-row>
                  <img
                    class="icon-company"
                    src="https://cdn11.bigcommerce.com/s-pl8vz9wzk5/product_images/uploaded_images/richloomcontract-woodblues.jpg?t=1578333795&_ga=2.211657687.376859109.1578324369-774153706.1570131906"
                  />
                  <v-col>
                    <h3 class="name-job">Lập trình viên Javascript</h3>
                    <span class="name-company">Công ty FPT</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-chip>10-15 triệu</v-chip>
                  <v-chip>Remote</v-chip>
                </v-row>
                <v-divider class="mx-4"></v-divider>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="deep-purple lighten-2" text> Xem thêm </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-card :loading="loading" class="mx-auto my-12" max-width="374">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-card-title>Công việc remote</v-card-title>

            <v-card-text>
              <div v-for="index in 10" :key="index" class="specific-job">
                <v-row>
                  <img
                    class="icon-company"
                    src="https://cdn11.bigcommerce.com/s-pl8vz9wzk5/product_images/uploaded_images/richloomcontract-woodblues.jpg?t=1578333795&_ga=2.211657687.376859109.1578324369-774153706.1570131906"
                  />
                  <v-col>
                    <h3 class="name-job">Lập trình viên Javascript</h3>
                    <span class="name-company">Công ty FPT</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-chip>10-15 triệu</v-chip>
                  <v-chip>Remote</v-chip>
                </v-row>
                <v-divider class="mx-4"></v-divider>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="deep-purple lighten-2" text> Xem thêm </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-card :loading="loading" class="mx-auto my-12" max-width="374">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-card-title>Tuyển thực tập sinh</v-card-title>

            <v-card-text>
              <div v-for="index in 10" :key="index" class="specific-job">
                <v-row>
                  <img
                    class="icon-company"
                    src="https://cdn11.bigcommerce.com/s-pl8vz9wzk5/product_images/uploaded_images/richloomcontract-woodblues.jpg?t=1578333795&_ga=2.211657687.376859109.1578324369-774153706.1570131906"
                  />
                  <v-col>
                    <h3 class="name-job">Lập trình viên Javascript</h3>
                    <span class="name-company">Công ty FPT</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-chip>10-15 triệu</v-chip>
                  <v-chip>Remote</v-chip>
                </v-row>
                <v-divider class="mx-4"></v-divider>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="deep-purple lighten-2" text> Xem thêm </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <!-- <v-row
      align="center"
      justify=""
      no-gutters
      style="height: 150px; margin: 0 250px"
    >
      <!-- <v-col v-for="item in dashboardsInfo" :key="item.content">
        <div>
          <p>
            <count-to
              :start-val="0"
              :end-val="item.amount"
              :duration="3000"
              class="card-panel-num"
            />+
          </p>
          <br />
          <h6>{{ item.content }}</h6>
        </div>
      </v-col> -->
    <!-- </v-row> -->
  </div>
</template>

<script>
// @ is an alias to /src
import CountTo from "vue-count-to";
import "particles.js";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

import AnimateText from "@/components/custom/animate-text";
import ScrollIcon from "@/components/custom/scroll-icon";
import AnimatedBackground from "@/components/custom/animated-background";

import GlobalMethods from "@/helpers/global-methods";
import Footer from "@/components/main/footer";
import Statistic from "@/components/main/statistic";
import { listRecruitments } from "../api/recruitments/recruitments";

export default {
  name: "Home",
  components: {
    CountTo,
    AnimateText,
    ScrollIcon,
    AnimatedBackground,
    Footer,
    Statistic,
  },
  data() {
    return {
      currentScrollTop: 0,
      page: 1,
      //API get info job
      dashboardsInfo: [
        {
          content: "Jobs",
          amount: "6890",
        },
        {
          content: "Members",
          amount: "1200",
        },
        {
          content: "Resume",
          amount: "36800",
        },
        {
          content: "Company",
          amount: "15400",
        },
      ],
      totalPages: 0,
      listJobHot: [],
      queryParams: {
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
      console.log(this.queryParams);
      listRecruitments(this.queryParams).then((response) => {
        if (response.status == 200) {
          this.listJobHot = response.data.content;
          this.totalPages = response.data.totalPages;
          console.log(this.listJobHot);
        }
      });
    },
    scrollToSection(n) {
      let i = n - 1,
        element = document.querySelectorAll(".page-sections section")[i];
      if (element) {
        this.scrollToElement(element);
      }
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
      console.log("detail job", idJob);
    },

    ...GlobalMethods,
  },
  watch: {
    currentScrollTop(top) {
      this.handleScrollChange(top);
    },
    page(value) {
      this.queryParams.page = value ? value : 1;
      this.getList();
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
      text-align: center;
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
  width: 60%;
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
  margin-left: 20px;
  margin-bottom: 35px;
  height: 200px;
  img {
    border-radius: 10px;
  }
  .row {
    margin-bottom: 10px;
    margin-left: 15px;
    .v-chip {
      margin-right: 10px;
    }
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

.specific-job {
  margin-bottom: 10px;
}
</style>