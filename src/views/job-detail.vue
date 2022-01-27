<template>
  <div class="main">
    <v-card class="mx-auto job-content">
      <v-container class="header">
        <v-row>
          <v-col cols="2">
            <img
              :src="data.company.avatar"
              width="100"
              height="100"
              class="img-company"
            />
          </v-col>
          <v-col cols="8">
            <h1 class="name-job">{{ data.jobTitle }}</h1>
            <h3>
              {{ data.company.companyName }}
              <div class="type-job">
                <v-icon>mdi-clock</v-icon>
                <span class=""
                  >Hạn nộp hồ sơ : {{ formatDate(data.dateRecruitment) }}</span
                >
              </div>
            </h3>
          </v-col>
          <v-col cols="2" class="button-submit">
            <v-btn style="float: right" color="green">
              <v-icon left dark> mdi-send </v-icon>Ứng tuyển</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-container class="header tab-company">
      <v-tabs>
        <v-tab>Tin tuyển dụng</v-tab>
        <v-tab>Thông tin công ty</v-tab>
        <v-tab>Việc làm liên quan</v-tab>
      </v-tabs>
    </v-container>
    <v-container class="content">
      <v-card class="job-detail" elevation="5">
        <h2 class="box-title">Chi tiết tin tuyển dụng</h2>
        <div class="info-general">
          <span>Thông tin chung</span>
          <v-row>
            <v-col cols="4" class="info-detail">
              <img
                src="https://www.topcv.vn/v4/image/job-detail/icon/1.svg"
                alt=""
              />
              <div>
                <strong>Mức lương </strong> <br />
                <span> Tới 33 triệu </span>
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="info-address">
          <span>Địa điểm làm việc</span>
          <p>- Khu vực: Hà Nội</p>
          <p>- Tầng 12, Hồng Hà Tower, 25 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội</p>
        </div>
        <div class="job-description">
          <h3>Mô tả công việc</h3>
          <p>
            {{ data.jobDescription }}
          </p>
        </div>
        <div class="job-requirement">
          <h3>Yêu cầu ứng viên</h3>
          <p>
            {{ data.jobRequirements }}
          </p>
        </div>
        <div class="job-benefit">
          <h3>Quyền lợi</h3>
          <p>{{ data.jobBenefits }}</p>
        </div>
      </v-card>
      <v-card class="job-detail" elevation="5" style="margin-top: 20px">
        <h2 class="box-title">Thông tin {{ data.company.companyName }}</h2>
        <div class="info-general">
          <span>Thông tin chung</span>
          <v-row>
            <v-col cols="4" class="info-detail">
              <img
                src="https://www.topcv.vn/v4/image/job-detail/icon/1.svg"
                alt=""
              />
              <div>
                <strong>Mức lương </strong> <br />
                <span> Tới 33 triệu </span>
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="info-address">
          <span>Địa điểm làm việc</span>
          <p>- Khu vực: Hà Nội</p>
          <p>- Tầng 12, Hồng Hà Tower, 25 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội</p>
        </div>
        <div class="job-description">
          <h3>Mô tả công việc</h3>
          <p>
            {{ data.jobDescription }}
          </p>
        </div>
        <div class="job-requirement">
          <h3>Yêu cầu ứng viên</h3>
          <p>
            {{ data.jobRequirements }}
          </p>
        </div>
        <div class="job-benefit">
          <h3>Quyền lợi</h3>
          <p>{{ data.jobBenefits }}</p>
        </div>
      </v-card>
      <v-card></v-card>
      <v-card></v-card>
    </v-container>
  </div>
</template>
<script>
import { getRecruitmentById } from "../api/recruitments/recruitments";
import moment from "moment";

export default {
  name: "JobDetails",
  components: {},
  data() {
    return {
      data: {},
      jobId: null,
    };
  },
  created() {
    // this.data = this.$route.params.jobInfo;
    this.getJobInfo(this.$route.params.jobId);
  },
  mounted() {
    this.data = this.$route.params.jobInfo;
  },
  methods: {
    getJobInfo(jobId) {
      getRecruitmentById(jobId).then((response) => {
        if (response.status == 200) {
          this.data = response.data;
        }
      });
    },
    formatDate(date) {
      if (date) {
        return moment(String(date)).format("DD/MM/yyyy");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  padding: 0 30px;
}
.img-company {
  align-items: center;
  border: 2px solid #eee;
  border-radius: 75px;
  display: flex;
  height: 110px;
  overflow: hidden;
  width: 110px;
}
.tab-company {
  margin-top: 10px;
}

.job-content {
  // border: 1px solid;
  width: 1200px;
  margin-top: 10px;
}
.info-detail {
  display: flex;
  img {
    width: 50px;
    height: 50px;
  }
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

.button-submit {
  display: flex;
  align-items: center;
}

.content {
  padding-right: 30px;
  padding-left: 40px;
}
.box-job-info {
  border-radius: 3px;
  padding: 16px;
  .box-title {
    border-left: 7px solid #00b14f;
    color: #333;
    font-size: 22px;
    font-weight: 700;
    margin: 0 0 16px;
    padding-left: 12px;
  }
}
.job-detail {
  padding: 10px 20px;
  .box-title {
    border-left: 7px solid #00b14f;
    color: #333;
    font-size: 22px;
    font-weight: 700;
    margin: 0 0 16px;
    padding-left: 12px;
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
  .info-address {
    background: #00b14f0d;
    border-radius: 3px;
    padding: 16px;
    > span {
      color: #333;
      font-weight: 700;
      margin-bottom: 16px;
      -webkit-text-decoration-line: underline;
      text-decoration-line: underline;
    }
  }
}

.footer {
  background-color: #f7e8e8;
  margin-top: 20px;
}
</style>