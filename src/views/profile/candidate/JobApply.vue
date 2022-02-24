<template>
  <div class="is-main">
    <div class="content">
      <v-card class="mx-auto" elevation="5">
        <v-row dense>
          <v-col v-for="(item, i) in items" :key="i" cols="12">
            <v-card class="job-apply" color="green" dark>
              <div class="d-flex flex-no-wrap justify-space-around">
                <v-avatar class="ma-3" size="125" tile>
                  <v-img :src="item.avatarCom"></v-img>
                </v-avatar>
                <div style="min-width: 600px">
                  <v-card-title
                    class="text-h5"
                    v-text="item.jobTitle"
                  ></v-card-title>
                  <v-card-subtitle>
                    <v-row>
                      <v-col cols="6">Công ty: {{ item.companyName }}</v-col>
                      <v-col cols="6">Vị trí: {{ item.career }}</v-col>
                      <v-col cols="6">Địa chỉ: {{ item.address }}</v-col>
                      <v-col cols="6">Mức lương: {{ item.salary }}</v-col>
                    </v-row>
                  </v-card-subtitle>
                </div>
                <div class="button-job">
                  <v-btn
                    color="secondary"
                    elevation="2"
                    @click="routeToDetailJob(item.id)"
                    >Chi tiết</v-btn
                  >
                  <!-- TODO: Check ứng tuyển hoặc chưa ứng tuyển -->
                  <v-btn
                    elevation="2"
                    color="error"
                    @click="rejectResume(item.id)"
                    >Hủy ứng tuyển</v-btn
                  >
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-divider class="mx-4"></v-divider>
        <div class="text-center">
          <v-pagination
            v-model="queryParams.page"
            :length="totalPages"
            :total-visible="5"
            circle
          ></v-pagination>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import {
  getCandidateById,
  updateProfileCandidate,
} from "@/api/candidate/candidate";
import {
  getRecruitmentApplied,
  cancelResume,
} from "@/api/recruitments/recruitments";
import moment from "moment";

export default {
  name: "Profile",
  data() {
    return {
      tab: null,
      data: {},
      dataQuery: {},
      dialog: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      url: null,
      page: 1,
      items: [],
      queryParams: {
        page: 1,
        size: 4,
      },
      totalPages: 1,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    computedDateFormatted() {
      return this.formatDate(this.dataQuery.birthday);
    },
  },
  created() {
    this.getJobApplied();
  },
  mounted() {},
  watch: {
    queryParams: {
      handler(val) {
        this.getJobApplied();
      },
      deep: true,
    },
  },
  methods: {
    getJobApplied() {
      getRecruitmentApplied(this.queryParams).then((response) => {
        console.log(response);
        if (response.status == 200) {
          this.items = response.data.content;
          this.totalPages = response.data.totalPages;
        }
      });
    },
    formatDate(date) {
      if (date) {
        return moment(String(date)).format("DD/MM/yyyy");
      }
    },
    checkProfile() {
      var a = this.data.phone;
      var b = this.data.fullName;
      var c = this.data.birthday;
      var d = this.data.address;
      var e = this.data.position;
      var f = this.data.experience;
      if (
        [a, b, c, d, e, f].includes("") ||
        [(a, b, c, d, e, f)].includes(null) ||
        [a, b, c, d, e, f].includes(undefined)
      ) {
        return false;
      } else {
        return true;
      }
    },
    editProfile() {
      getCandidateById(this.currentUser.id).then((response) => {
        if (response.status == 200) {
          this.dataQuery = response.data;
        }
      });
      this.dialog = true;
    },
    submitEditProfile() {
      updateProfileCandidate(this.dataQuery).then((response) => {
        this.showToast("success", response.data);
        this.dialog = false;
        this.getCandidate();
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
    onFileChange(e) {
      this.url = URL.createObjectURL(e);
    },
    handleUploaded({ form, request, response }) {
      // update user avatar attribute
    },
    editCropper() {
      this.dialogAvatar = true;
      console.log("edit image");
    },
    routeToDetailJob(jobId) {
      console.log(jobId);
      this.$router.push(`/job-detail/${jobId}`);
    },
    rejectResume(recruitmentId) {
      this.$swal
        .fire({
          title: "Bạn chắc chắn muốn hủy ứng tuyển công việc này?",
          showDenyButton: true,
          // showCancelButton: true,
          confirmButtonText: "Đồng ý",
          denyButtonText: `Hủy`,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            // this.$swal.fire("Saved!", "", "success");
            cancelResume(recruitmentId).then((response) => {
              this.showToast("success", response.data);
              this.getJobApplied();
            });
          } else if (result.isDenied) {
            this.getJobApplied();
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  margin: auto;
  width: 60%;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
}

.tab-item {
  display: flex;
  justify-content: center;
  height: 82vh;

  .v-card {
    margin-top: 10px;
    width: 50%;
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

.is-statistic {
  margin: 50px 0;
}

.content {
  margin: 0 50px;
}

.is-main {
  min-height: unset;
}

#personalinfo-section {
  padding: 30px;
}

.widget-head {
  margin-bottom: 10px;
}

.cb-title-h3 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.right-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tipsss {
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    margin-bottom: unset;
  }

  margin-right: 10px;
}

.status-error p {
  color: red;
  margin-bottom: unset;
}
.status-success p {
  color: green;
  margin-bottom: unset;
}

.is-tam {
  margin-bottom: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #29aafe;
  padding: 5px 10px;
  color: #29aafe;
  border-radius: 999999999px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: black;

    em {
      color: #29aafe;
    }
  }

  em {
    margin-right: 5px;
  }
}

.is-td-one {
  width: 200px;
  font-weight: bold;
  padding-bottom: 10px;
}
/* image */
.img-circle {
  border-radius: 50%;
}
.user-info-head {
  position: relative;
  display: inline-block;
  height: 100px;
}
.user-info-head:hover:after {
  content: "+";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  color: #eee;
  background: rgba(0, 0, 0, 0.5);
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  line-height: 100px;
  border-radius: 50%;
  text-align: center;
}
.mx-auto {
  margin-top: 40px;
}
.button-job {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  button {
    margin: 10px 10px;
    width: 100%;
  }
}
.job-apply {
  margin: 10px 10px;
  border-radius: 15px;
}
</style>