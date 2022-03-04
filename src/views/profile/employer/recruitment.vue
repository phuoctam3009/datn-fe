<template>
  <div class="main">
    <v-card class="card-filter">
      <v-container class="is-search">
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field outlined label="Tìm kiếm ..." dense></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card>
      <v-container class="is-data-job">
        <div class="is-title">
          <span>Danh sách tin tuyển dụng</span>
          <div class="is-line"></div>
          <v-btn
            depressed
            color="success"
            style="margin-right: 20px"
            @click="addNewRecruitment"
            >Thêm mới</v-btn
          >
        </div>
        <v-card
          class="card-job"
          v-for="(item, i) in listRecruitment"
          :key="i"
          cols="4"
          hover
        >
          <v-row class="is-row-data">
            <v-col cols="2">
              <img
                :src="item.avatarCom"
                style="
                  width: 150px;
                  height: 150px;
                  object-fit: cover;
                  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
                "
              />
            </v-col>
            <v-col cols="8">
              <div class="content">
                <v-row>
                  <span style="font-weight: bold; font-size: 20px">{{
                    item.jobTitle
                  }}</span>
                </v-row>
                <v-row>
                  <v-col cols="6" class="is-col-data"
                    >Mức lương: {{ item.salary }}</v-col
                  >
                  <v-col cols="6" class="is-col-data">
                    <span v-html="formatStatus(item.isActive)"></span>
                  </v-col>
                  <v-col cols="6" class="is-col-data"
                    >Số lượng: {{ item.amountEmployee }}</v-col
                  >

                  <v-col cols="6" class="is-col-data"
                    >Địa chỉ: {{ item.address }}</v-col
                  >
                </v-row>
              </div>
            </v-col>
            <v-col cols="2" class="btn-detail">
              <div class="card-button">
                <v-btn color="indigo" @click="getListCandidate(item.id)" dark
                  >Ứng viên</v-btn
                >
                <v-btn color="cyan" dark @click="openDialogEdit(item.id)"
                  >Chỉnh sửa</v-btn
                >
                <v-btn color="error" @click="deleteConfirm(item.id)">Xóa</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
      <div class="text-center" style="padding: 20px 0 30px 0">
        <v-pagination
          v-model="queryParams.page"
          :length="totalPage"
          :total-visible="7"
          circle
        ></v-pagination>
      </div>
    </v-card>
    <v-dialog v-model="dialog" max-width="800px" content-class="mt-16">
      <v-card class="flexcard" height="100%">
        <v-card-title class="text-h5 grey lighten-2">
          {{ title }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" class="mb-n8">
              <v-text-field
                label="Tiêu đề tin tuyển dụng"
                v-model="dataQuery.jobTitle"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="number"
                hide-details
                v-model="dataQuery.amountEmployee"
                label="Số lượng"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="mb-n8">
              <v-text-field
                v-model="dataQuery.salary"
                label="Mức lương"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="mb-n8">
              <v-select
                v-model="dataQuery.career"
                :items="listCareer"
                item-text="nameCareer"
                item-value="id"
                label="Vị trí"
                required
                outlined
                return-object
              ></v-select>
            </v-col>
            <v-col cols="12" class="mb-n8">
              <v-select
                v-model="dataQuery.level"
                :items="listLevel"
                item-text="nameLevel"
                item-value="id"
                label="Cấp bậc"
                required
                return-object
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12" class="mb-n8">
              <v-select
                v-model="dataQuery.typeWork"
                :items="listTypeWork"
                item-text="nameTypeWork"
                item-value="id"
                label="Hình thức làm việc"
                required
                return-object
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12" class="mb-n8">
              <v-text-field
                v-model="dataQuery.workExperience"
                label="Yêu cầu kinh nghiệm"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="mb-n8">
              <v-select
                v-model="dataQuery.city"
                :items="listCity"
                item-text="cityName"
                item-value="id"
                label="Thành phố"
                required
                return-object
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12" class="mb-n8">
              <v-text-field
                v-model="dataQuery.address"
                label="Địa chỉ"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-col cols="12" class="mb-n8">
                  <v-text-field
                    v-model="computedDateFormatted"
                    label="Hạn ứng tuyển"
                    outlined
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </v-col>
              </template>
              <v-date-picker
                v-model="dataQuery.dateRecruitment"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
            <v-col cols="12" class="mb-n8">
              <v-textarea
                v-model="dataQuery.jobDescription"
                label="Mô tả công việc"
                required
                outlined
              ></v-textarea>
            </v-col>
            <v-col cols="12" class="mb-n8">
              <v-textarea
                v-model="dataQuery.jobRequirements"
                label="Yêu cầu ứng viên"
                required
                outlined
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="dataQuery.jobBenefits"
                label="Quyền lợi"
                required
                outlined
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray darken-1" text @click="dialog = false">
            Đóng lại
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="submitEditRecruitment"
            :loading="loading"
          >
            Lưu
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right
      width="600"
      height="100%"
    >
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Danh sách ứng viên
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>
      <v-list nav dense class="list-cv">
        <v-card
          class="card-job my-5"
          v-for="(item, i) in listCv"
          :key="i"
          cols="4"
          hover
          max-width="600"
        >
          <v-row class="is-row-data">
            <v-col cols="4">
              <img
                :src="item.avatar"
                style="
                  width: 150px;
                  height: 150px;
                  object-fit: cover;
                  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
                "
              />
            </v-col>
            <v-col cols="5">
              <div class="content">
                <v-row>
                  <span style="font-weight: bold; font-size: 20px">{{
                    item.candidate.fullName
                  }}</span>
                </v-row>
                <v-row>
                  <v-col cols="12" class="is-col-data"
                    >Điện thoại: {{ item.candidate.phone }}</v-col
                  >
                  <v-col cols="12" class="is-col-data">
                    <span>Địa chỉ: {{ item.candidate.address }}</span>
                  </v-col>
                </v-row>
              </div>
            </v-col>
            <v-col cols="3">
              <div class="card-button">
                <v-btn color="success" @click="previewCv(item)">Xem CV</v-btn>
                <v-btn color="error">Hủy</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card>
        <div v-if="listCv.length < 1">
          <span style="padding-left: 10px">Hiện tại chưa có ứng viên nào</span>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import {
  getRecruitmentById,
  getRecruitmentByEmployer,
  deleteRecruitment,
  employerUpdateInfo,
  employerAddRecruitment,
  getResumesByRecruitmentId,
} from "../../../api/recruitments/recruitments";
import { listCareers } from "../../../api/career/career";
import { listLevels } from "../../../api/level/level";
import { listTypeWorks } from "../../../api/typework/typework";
import { listCitys } from "../../../api/city/city";
import moment from "moment";

export default {
  name: "CompanyList",
  components: {},
  data() {
    return {
      menu: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      listRecruitment: [],
      queryParams: {
        page: 1,
        size: 4,
      },
      model: 1,
      totalPage: 1,
      dialog: false,
      loading: false,
      title: "",
      dataQuery: {},
      listCareer: [],
      listLevel: [],
      listTypeWork: [],
      listCv: [],
      listCity: [],
      drawer: false,
      group: null,
    };
  },
  created() {
    this.getList();
    this.getListsCareers();
    this.getListLevels();
    this.getListTypeWork();
    this.getListCity();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    computedDateFormatted() {
      return this.formatDate(this.dataQuery.dateRecruitment);
    },
  },
  methods: {
    openCV(resumeId) {
      this.$router.push(`/resume/material-dark/${resumeId}`);
    },
    previewCv(item) {
      var basePath = "http://127.0.0.1:8887/";
      window.open(basePath + item.path, "_blank", "fullscreen=yes");
    },
    getListCandidate(jobId) {
      this.drawer = true;
      // getRecruitmentsReference(jobId).then((response) => {
      //   console.log(response);
      // });
      getResumesByRecruitmentId(jobId).then((response) => {
        this.listCv = response.data;
        console.log(response);
      });
    },
    addNewRecruitment() {
      this.dataQuery = {};
      this.dialog = true;
      this.title = "Thêm thông tin tuyển dụng";
    },
    getListCity() {
      listCitys().then((response) => {
        this.listCity = response.data;
      });
    },
    getListTypeWork() {
      listTypeWorks().then((response) => {
        this.listTypeWork = response.data;
      });
    },
    getListsCareers() {
      listCareers().then((response) => {
        this.listCareer = response.data;
      });
    },
    getListLevels() {
      listLevels().then((response) => {
        this.listLevel = response.data;
      });
    },
    formatDate(date) {
      if (date) {
        return moment(String(date)).format("DD/MM/yyyy");
      }
    },
    deleteConfirm(id) {
      this.$swal
        .fire({
          title: "Bạn chắc chắn muốn xóa thông tin tuyển dụng này?",
          showDenyButton: true,
          // showCancelButton: true,
          confirmButtonText: "Xóa",
          denyButtonText: `Hủy`,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            deleteRecruitment(id).then(
              (response) => {
                this.showToast("success", response.data);
                this.getRecruitment();
              },
              (error) => {
                this.showToast("error", error.response.data.message);
                this.getRecruitment();
              }
            );
          }
        });
    },
    showToast(status, title) {
      let Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: status,
        title: title,
      });
    },
    formatStatus(isActive) {
      if (isActive) {
        return "<span style='color: green;'>Đã xét duyệt</span>";
      } else {
        return "<span style='color: red;'>Chưa duyệt</span>";
      }
    },
    getRecruitment() {
      getRecruitmentByEmployer(this.queryParams).then((response) => {
        if (response.status == 200) {
          console.log("data", response.data.content);
          this.listRecruitment = response.data.content;
          this.totalPage = response.data.totalPages;
        }
      });
    },
    getList() {
      this.getRecruitment();
    },
    openDialogEdit(id) {
      getRecruitmentById(id).then((response) => {
        this.dataQuery = response.data;
      });
      this.dialog = true;
      this.title = "Sửa thông tin tuyển dụng";
    },
    submitEditRecruitment() {
      this.loading = true;
      const payload = { ...this.dataQuery };
      payload.careerId = payload.career.id;
      payload.levelId = payload.level.id;
      payload.typeWorkId = payload.typeWork.id;
      payload.cityId = payload.city.id;
      if (payload.id) {
        //Update recruitment
        employerUpdateInfo(payload).then(
          (response) => {
            this.showToast("success", response.data);
            this.dialog = false;
            this.getList();
          },
          (error) => {
            this.showToast("error", error.response.data.message);
          }
        );
        this.loading = false;
      } else {
        //AddRecruitment
        payload.userId = this.currentUser.id;
        employerAddRecruitment(payload).then(
          (response) => {
            this.showToast("success", response.data);
            this.dialog = false;
            this.getList();
          },
          (error) => {
            this.showToast("error", error.response.data.message);
          }
        );
        this.loading = false;
      }
    },
  },
  watch: {
    queryParams: {
      handler(val) {
        this.getRecruitment();
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
section {
  position: relative;
  padding: 96px 0;
  -webkit-background-size: cover;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

section.bg-alt {
  background-color: #fafafa;
}

.no-padding-top {
  padding-top: 0;
}

.container {
  /*padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;*/
}

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

.card-filter {
}

.button-filter {
  display: flex;
  flex-direction: row-reverse;
  line-height: 12px;
}

.flex {
  margin-top: 40px;

  .item-job {
    padding-top: 20px;

    .row {
      margin-left: 20px;
      padding-bottom: 20px;
      max-height: 120px;

      .col-8 {
        margin-left: 30px;
      }

      .row {
        display: flex;
        justify-content: center;
      }
    }

    .company-name {
      font-size: 25px;
    }

    h3 {
      font-size: 17px;
      margin-top: 6px;
      color: #96a2b2;
      font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
      font-weight: 300;
    }
  }

  .company-desc {
    padding: 20px 30px;

    span {
    }
  }
}

.type-job {
  padding: 5px 20px;
  display: inline-block;
}

form {
  margin-top: -150px;
}

.text-center {
  margin-top: 20px;
}

.company .box-company {
  background: #fff 0 0 no-repeat padding-box;
  border-radius: 5px;
  box-shadow: -1px 1px 4px #0000000d;
  height: 400px;
  margin-bottom: 24px;
  overflow: hidden;
}

.company .box-company .company-banner {
  height: 180px;
  margin-bottom: 16px;
  overflow: hidden;
  position: relative;
  width: 100px;
}

.company .box-company .company-banner .company-logo {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 5px;
  bottom: 0;
  height: 64px;
  left: 16px;
  position: absolute;
  width: 64px;
}

.company .box-company .company-info {
  padding: 0 16px;
}

.img-fluid {
  width: 100px;
}

.com-name {
  &:hover {
    text-decoration: underline;
  }
}

.card-job {
  margin: 10px 10px;
  margin-bottom: 30px;
}

.btn-detail {
  display: flex;
  justify-content: center;
  align-items: center;
  .card-button {
    display: flex;
    flex-direction: column;
    button {
      margin: 5px 0px;
    }
  }
}

.is-data-job {
  //padding: 30px 0 0 0;
  padding-left: unset;
  padding-right: unset;
}

.is-search {
  padding-top: 30px;
}

.is-row-data {
  padding: 20px;
}

.is-col-data {
  padding-left: unset;
  padding-right: unset;
}

.is-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px 30px;
  font-size: 25px;
  color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  span {
    padding: 5px 10px;
    width: 50%;
    background: #00b14f;
    position: relative;

    &:after {
      content: "";
      position: absolute;
      top: -36px;
      right: -35px;
      width: 70px;
      height: 70px;
      transform: rotate(45deg);
      background-color: white; /* to see where it is */
    }
  }

  div {
    color: #00b14f;
    width: 50%;
    text-align: right;
  }
}

.is-line {
  margin-right: 10px !important;
  width: 250px !important;
  height: 3px;
  background: #00b14f;
}
.flexcard {
  display: flex;
  flex-direction: column;
  z-index: 100000;
}
// Add the css below if your card has a toolbar, and if your toolbar's height increases according to the flex display.
.flexcard .v-toolbar {
  flex: 0;
}
.v-dialog:not(.v-dialog--fullscreen) {
  max-height: 85% !important;
}
.list-cv {
  // overflow-y: auto !important;
  height: calc(100% - 64px);
}
.card-button {
  display: flex;
  flex-direction: column;
  button {
    margin: 5px 0px;
  }
}
</style>