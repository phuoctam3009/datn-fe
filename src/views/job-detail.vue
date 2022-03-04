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
            <router-link
              :to="{
                name: 'CompanyDetail',
                params: { companyId: data.company.id },
              }"
              target="_blank"
              style="display: table; text-decoration: none"
            >
              <h3>
                {{ data.company.companyName }}
              </h3>
            </router-link>
            <div class="type-job">
              <v-icon>mdi-clock</v-icon>
              <span class="time-apply"
                >Hạn nộp hồ sơ : {{ formatDate(data.dateRecruitment) }}</span
              >
            </div>
          </v-col>
          <v-col cols="2" class="button-submit">
            <v-dialog v-model="dialog" width="800px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-show="!isApply"
                  dark
                  style="float: right"
                  color="green"
                  @click="applyJob"
                >
                  <v-icon left dark> mdi-send</v-icon>
                  Ứng tuyển
                </v-btn>
                <v-btn v-show="isApply" disabled>Đã ứng tuyển</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Chọn CV</span>
                </v-card-title>
                <v-card-text>
                  <v-radio-group v-model="radioGroup">
                    <v-row
                      v-for="(item, index) in resumesInfo"
                      :key="index"
                      style="align-items: center"
                    >
                      <v-col cols="1">
                        <v-radio :value="item.id" selected></v-radio>
                      </v-col>
                      <v-col cols="4">
                        <v-img
                          v-if="item.avatar"
                          style="width: 150px; height: 150px"
                          :src="item.avatar"
                          @error="replaceByDefault"
                        ></v-img>
                        <v-img
                          v-else
                          style="width: 150px; height: 150px"
                          src="../../resume/id.jpg"
                        ></v-img>
                      </v-col>
                      <v-col cols="3"> {{ item.title }} </v-col>
                      <v-col cols="4">
                        <v-btn @click="previewCV(item)">Xem </v-btn>
                      </v-col>
                      <v-divider></v-divider>
                    </v-row>
                  </v-radio-group>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="dialog = false"> Hủy </v-btn>
                  <v-btn color="green" text @click="applyResume">
                    Nộp CV
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>
      <v-dialog width="800">
        <v-card max-width="800" max-height="600" outlined>
          <!-- <v-row
            v-for="(item, index) in resumesInfo"
            :key="index"
            style="align-items: center"
          >
            <v-col cols="4">
              <v-img
                style="width: 150px; height: 150px"
                src="http://res.cloudinary.com/degh5xw5d/image/upload/v1645290401/wtcbdvrabns2fvuum95u.jpg"
              ></v-img>
            </v-col>
            <v-col cols="4"> {{ item.title }} </v-col>
            <v-col cols="4">
              <v-btn>Chọn</v-btn>
              <v-btn>Xem</v-btn>
              <v-btn>Sửa</v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider> -->
        </v-card>
      </v-dialog>
    </v-card>

    <v-container class="header tab-company">
      <v-tabs style="margin: 40px 15px 10px 15px">
        <v-tab>Tin tuyển dụng</v-tab>
        <v-tab @click="handleScroll('company')">Thông tin công ty</v-tab>
        <v-tab @click="handleScroll('jobRef')">Việc làm liên quan</v-tab>
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
                <span> Tới {{ data.salary }} triệu </span>
              </div>
            </v-col>
            <v-col cols="4" class="info-detail">
              <img
                src="https://www.topcv.vn/v4/image/job-detail/icon/5.svg"
                alt=""
              />
              <div>
                <strong>Số lượng tuyển </strong> <br />
                <span> {{ data.amountEmployee }} người </span>
              </div>
            </v-col>
            <v-col cols="4" class="info-detail">
              <img
                src="https://www.topcv.vn/v4/image/job-detail/icon/7.svg"
                alt=""
              />
              <div>
                <strong>Kinh nghiệm </strong> <br />
                <span> {{ data.workExperience }} </span>
              </div>
            </v-col>
            <v-col cols="4" class="info-detail">
              <img
                src="https://www.topcv.vn/v4/image/job-detail/icon/2.svg"
                alt=""
              />
              <div>
                <strong>Hình thức làm việc </strong> <br />
                <span> {{ data.typeWork.nameTypeWork }} </span>
              </div>
            </v-col>
            <v-col cols="4" class="info-detail">
              <img
                src="https://www.topcv.vn/v4/image/job-detail/icon/6.svg"
                alt=""
              />
              <div>
                <strong>Cấp bậc </strong> <br />
                <span> {{ data.level.nameLevel }} </span>
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="info-address">
          <span>Địa điểm làm việc</span>
          <!-- <p>- Khu vực: Hà Nội</p> -->
          <p>- {{ data.address }}</p>
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
      <v-card
        class="job-detail"
        elevation="5"
        style="margin: 20px 0; padding: 20px 0 0 30px"
        ref="company"
      >
        <v-row>
          <h2 class="box-title">Thông tin {{ data.company.companyName }}</h2>
          <div style="position: absolute; right: 30px">
            <router-link
              class="detail-company"
              :to="{
                name: 'CompanyDetail',
                params: { companyId: data.company.id },
              }"
              target="_blank"
              >Chi tiết công ty
              <span class="group pa-2">
                <v-icon small>mdi-arrow-top-right</v-icon>
              </span></router-link
            >
          </div>
        </v-row>
        <v-row>
          <v-col cols="1" style="margin-right: -50px">
            <img
              src="https://www.topcv.vn/v4/image/job-detail/icon/8.svg"
              alt=""
            />
          </v-col>
          <v-col>
            <h3>Giới thiệu</h3>
            <span>{{ data.company.description }}</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1" style="margin-right: -50px">
            <img
              src="https://www.topcv.vn/v4/image/job-detail/icon/10.svg"
              alt=""
          /></v-col>
          <v-col>
            <h3>Địa điểm</h3>
            <span>{{ data.company.address }}</span>
          </v-col>
        </v-row>
        <v-divider class="mx-4"></v-divider>
        <v-row style="margin: 10px 1px">
          <img src="" alt="" />
          <h3>Việc làm cùng công ty</h3>
          <div style="position: absolute; right: 30px">
            <router-link
              class="detail-company"
              :to="{
                name: 'CompanyDetail',
                params: { companyId: data.company.id },
              }"
              >Xem nhiều hơn
              <span class="group pa-2">
                <v-icon small>mdi-arrow-top-right</v-icon>
              </span></router-link
            >
          </div>
        </v-row>
        <v-row>
          <v-col v-for="(item, i) in jobReferencesCompany" :key="i" cols="4">
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-4" style="white-space: nowrap">
                    <router-link
                      :to="{ name: 'JobDetail', params: { jobId: item.id } }"
                      target="_blank"
                    >
                      {{ item.jobTitle }}
                    </router-link>
                  </div>
                  <v-list-item-title class="text-h5 mb-1">
                    <v-chip>{{ item.nameLevel }}</v-chip>
                    <v-chip>{{ item.nameTypeWork }}</v-chip>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mx-4"></v-divider>
              <v-card-actions>
                <v-text style="margin-left: 8px"
                  >Còn
                  <span style="font-weight: bold">{{ item.dateDiff }}</span>
                  ngày để ứng tuyển
                </v-text>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <v-card
        class="job-detail"
        elevation="5"
        style="margin-top: 30px"
        ref="jobRef"
      >
        <h2 class="box-title">Việc làm liên quan</h2>
        <v-container>
          <v-row dense>
            <!-- Item lấy limit 5 -->
            <v-col v-for="(item, i) in jobReferences" :key="i" cols="12">
              <v-card>
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title class="text-h5">
                      <router-link
                        :to="{ name: 'JobDetail', params: { jobId: item.id } }"
                        target="_blank"
                      >
                        {{ item.jobTitle }}
                      </router-link>
                    </v-card-title>

                    <v-card-subtitle v-text="item.artist"></v-card-subtitle>
                    <v-chip style="margin-left: 15px"
                      >{{ item.nameLevel }}
                    </v-chip>
                    <v-chip>{{ item.nameTypeWork }}</v-chip>

                    <v-card-actions style="margin-left: 10px">
                      <span
                        >Còn
                        <span style="font-weight: bold">{{
                          item.dateDiff
                        }}</span>
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
                      target="_blank"
                    >
                      <v-img :src="item.avatarCom"></v-img>
                    </router-link>
                  </v-avatar>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import {
  getRecruitmentById,
  getRecruitmentReferenceByCompanyId,
  getRecruitmentsReference,
  addCvToRecruitment,
  checkCvIsApplied,
} from "../api/recruitments/recruitments";
import { getResumes } from "../api/resume/resume";
import moment from "moment";
import img from "../../resume/id.jpg";

export default {
  name: "JobDetails",
  components: {},
  data() {
    return {
      data: {},
      jobId: null,
      jobReferences: [],
      jobReferencesCompany: [],
      dialog: false,
      resumesInfo: [],
      radioGroup: null,
      isApply: false,
    };
  },
  created() {
    // this.data = this.$route.params.jobInfo;
    this.getJobInfo(this.$route.params.jobId);
    this.checkApply();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.data = this.$route.params.jobInfo;
  },
  methods: {
    getJobInfo(jobId) {
      getRecruitmentById(jobId).then((response) => {
        if (response.status == 200) {
          this.data = response.data;
          getRecruitmentReferenceByCompanyId(
            response.data.company.id,
            this.$route.params.jobId
          ).then((res) => {
            if (res.status == 200) {
              this.jobReferencesCompany = res.data;
            }
          });
          getRecruitmentsReference(this.$route.params.jobId).then((res) => {
            if (res.status == 200) {
              console.log("res", res);
              this.jobReferences = res.data;
            }
          });
        }
      });
    },
    checkApply() {
      checkCvIsApplied(this.$route.params.jobId).then((response) => {
        if (response.status == 200) {
          this.isApply = response.data;
          console.log(this.isApply);
        }
      });
    },
    handleScroll(refName) {
      var element = this.$refs[refName];
      var top = element.$refs.link.offsetTop;

      window.scrollTo({ left: 0, top: top, behavior: "smooth" });
    },
    formatDate(date) {
      if (date) {
        return moment(String(date)).format("DD/MM/yyyy");
      }
    },
    applyJob() {
      getResumes(this.currentUser.id).then((response) => {
        this.resumesInfo = response.data;
      });
      this.dialog = true;
    },
    replaceByDefault(e) {
      e.target.src = img;
    },
    openCV(resumeId) {
      this.$router.push(`/resume/material-dark/${resumeId}`);
    },
    previewCV(item) {
      var basePath = "http://127.0.0.1:8887/";
      window.open(basePath + item.path, "_blank", "fullscreen=yes");
    },
    applyResume() {
      console.log(this.radioGroup);
      if (this.radioGroup == null) {
        this.$swal("Thất bại", "Vui lòng chọn CV", "error");
        return "";
      }
      var data = {
        resumeId: this.radioGroup,
        recruitmentId: this.$route.params.jobId,
      };
      addCvToRecruitment(data).then(
        (response) => {
          if (response.status == 200) {
            this.$swal("Thành công", "Ứng tuyển CV thành công", "success").then(
              () => {
                this.$router.push("/candidate/profile");
              }
            );
          }
        },
        (error) => {
          this.$swal("Thất bại", error.response.data.message, "error");
          return "";
        }
      );
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

  div {
    margin-left: 20px;
  }
}

.lead {
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 20px;
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

.v-chip {
  margin-left: 4px;
}

.name-job {
  color: #00b14f;
}

.time-apply {
  font-size: 20px;
}

.detail-company {
  text-decoration: none;
  color: #00b14f;
  font-size: 18px;
  font-weight: 500;
  white-space: nowrap;
}

.group {
  i {
    color: #00b14f;
  }
}

.footer {
  background-color: #f7e8e8;
  margin-top: 20px;
}

.main {
  margin-top: 40px;
}
.v-dialog {
  margin-top: 60px;
}
</style>