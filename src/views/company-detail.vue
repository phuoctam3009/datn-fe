<template>
  <div class="main">
    <div class="p-detail-company">
      <img class="p-detail-company__img" :src="data.background" alt="" />
      <div class="p-detail-company__container">
        <img :src="data.avatar" class="img-company" />
        <div>
          <h1 class="company-name">{{ data.companyName }}</h1>
          <v-row>
            <v-col>
              <v-icon medium> home</v-icon>
              <span>{{ data.address }}</span>
            </v-col>
            <v-col>
              <v-icon medium> travel_explore</v-icon>
              <a
                style="text-decoration: underline; cursor: pointer"
                href="#"
                target="_blank"
                >{{ data.website }}</a
              >
            </v-col>
          </v-row>
        </div>
      </div>
    </div>

    <v-container>
      <div class="content-company">
        <v-tabs class="tabs">
          <v-tab>Giới thiệu công ty</v-tab>
          <v-tab>Tuyển dụng</v-tab>
        </v-tabs>
      </div>
      <div>
        <v-card class="mx-auto my-12 intro-company" elevation="5">
          <h2 class="box-title">Giới thiệu công ty</h2>
          <div class="content-intro">
            {{ data.description }}
          </div>
        </v-card>

        <v-card class="mx-auto my-12 intro-company" elevation="5">
          <h2 class="box-title">Tuyển dụng</h2>
          <v-container>
            <v-row dense>
              <!-- Item lấy limit 5 -->
              <v-col v-for="(item, i) in data.recruitments" :key="i" cols="12">
                <v-card>
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title class="text-h5">
                        <router-link
                          :to="{
                            name: 'JobDetail',
                            params: { jobId: item.id },
                          }"
                        >
                          {{ item.jobTitle }}
                        </router-link>
                      </v-card-title>

                      <v-chip style="margin-left: 15px">
                        {{ item.level.nameLevel }}
                      </v-chip>
                      <v-chip style="margin-left: 4px">
                        {{ item.typeWork.nameTypeWork }}
                      </v-chip>

                      <v-card-actions style="margin-left: 10px">
                        <span
                          >Còn
                          <span style="font-weight: bold">
                            {{ getDateDiff(item.dateRecruitment) }}
                          </span>
                          ngày để ứng tuyển</span
                        >
                      </v-card-actions>
                    </div>

                    <v-avatar class="ma-3" size="125" tile>
                      <router-link
                        :to="{
                          name: 'CompanyDetail',
                          params: { companyId: item.companyId },
                        }"
                      >
                        <v-img :src="item.avatarCom"></v-img>
                      </router-link>
                    </v-avatar>
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <v-row
              v-if="data.recruitments.length < 1"
              dense
              style="text-align: center"
            >
              <span>Hiện tại chưa có tin tuyển dụng</span>
            </v-row>
            <!-- <v-row v-if="!data.recruitments.length"> Hiện không có tin tuyển dụng </v-row> -->
          </v-container>
        </v-card>
      </div>
    </v-container>
  </div>
</template>
<script>
import { getCompanyById } from "../api/company/company";
import moment from "moment";

export default {
  name: "CompanyDetail",
  components: {},
  data() {
    return {
      cssProps: {
        backgroundImage: `url(${require("@/assets/background/background.jpg")})`,
      },
      companyId: "",
      data: {},
    };
  },
  created() {
    // this.data = this.$route.params.jobInfo;
    this.getCompanyInfo(this.$route.params.companyId);
  },
  methods: {
    getCompanyInfo(companyId) {
      console.log("companyId", companyId);
      getCompanyById(companyId).then((response) => {
        if (response.status == 200) {
          this.data = response.data;
          console.log(this.data);
          this.cssProps.backgroundImage = "url(" + this.data.background + ")";
          console.log(this.cssProps.backgroundImage);
        }
      });
    },
    getDateDiff(dateEnd) {
      var now = moment();
      const end = moment(dateEnd);
      var days = end.diff(now, "days");
      return days;
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  padding: 0 30px;

  .row :first-of-type {
    .col-8 {
      margin-left: -45px;
    }
  }
}

.card-company {
  width: 100%;
  background-size: cover 100% 100%;
  background-repeat: no-repeat;

  .info-company {
    justify-content: center;
    box-shadow: -1px 1px 6px rgb(0 0 0 / 5%);
    padding-bottom: 10px;
  }

  // border-radius: 50px;
  // -webkit-border-radius: 50px;
  // -moz-border-radius: 50px;
}

.img-company {
  border: 2px solid #eee;
  border-radius: 50% 50%;
  height: 150px;
  object-fit: cover;
}

.company-name {
  padding-top: 10px;
  white-space: nowrap;
}

.content-company {
  margin-top: 100px;
}

.intro-company {
  padding-left: 10px;
  padding-top: 15px;
  // width: 60%;
  .box-title {
    border-left: 7px solid #00b14f;
    color: #333;
    font-size: 22px;
    font-weight: 700;
    margin: 0 0 16px;
    padding-left: 12px;
  }

  .content-intro {
    padding: 10px 10px;
  }

  .info-general {
    background: #00b14f0d;
    border-radius: 3px;
    margin-bottom: 8px;
    padding: 16px 16px 0;

    > span {
      color: #333;
      font-weight: 700;
      margin-bottom: 16px;
      -webkit-text-decoration-line: underline;
      text-decoration-line: underline;
    }
  }
}

.job-content {
  width: 1200px;
  min-height: 400px;
  margin-top: -300px;
}

.lead {
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 20px;
  margin-left: 10px;
}

.info-detail {
  margin-left: 10px;
}

.content {
  padding-top: 100px;
  padding-right: 30px;
  padding-left: 40px;
}

.title {
  text-align: center;

  span {
    color: #c8d0d7;
    // font-family: Arial,Helvetica Neue,Helvetica,sans-serif;
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  h2 {
    position: relative;
    margin-bottom: 48px;
    color: #55595c;
    text-transform: capitalize;
    font-size: 37px;
  }

  h2:after {
    position: absolute;
    left: 50%;
    margin-left: -24px;
    bottom: -26px;
    width: 48px;
    height: 2px;
    background-color: #29aafe;
    content: "";
  }
}

.job-info {
  background: #fafafa;
}

.job-available {
  .column {
    .flex {
      padding-top: 20px;

      .item-job {
        padding-top: 10px;

        .row {
          margin-left: 30px;

          .col-8 {
            margin-left: 25px;
          }
        }

        .name-job {
          font-size: 25px;
        }

        h3 {
          font-size: 17px;
          margin-top: 6px;
          color: #96a2b2;
          // font-family: Arial,Helvetica Neue,Helvetica,sans-serif;
          font-weight: 300;
        }
      }

      .footer-card {
        background-color: #fdfdfd;
        max-height: 55px;

        .status {
          font-size: 15px;
          line-height: 22px;
          color: #96a2b2;
          padding-top: 10px;
          padding-left: 15px;
        }

        .col-10 {
          padding-left: 5px;
        }
      }
    }

    .row {
      margin-top: 20px;
      margin-left: 10px;
    }
  }
}

.footer {
  background-color: #fafafa;
  margin: 20px -30px -30px;

  .col-4 {
    display: flex;
    justify-content: end;

    button {
      margin-right: 15px;
    }
  }
}

.p-detail-company {
  position: relative;

  &__img {
    width: 100vw;
    height: 50vh;
    object-fit: cover;
  }

  &__container {
    margin: 0 auto;
    max-width: 1160px;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;

    img {
      margin-right: 20px;
    }

    h1 {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>