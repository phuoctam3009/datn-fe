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
              <v-btn color="success" @click="openDialogEdit(item.id)"
                >Chỉnh sửa</v-btn
              >
              <v-btn color="error" @click="deleteConfirm(item.id)">Xóa</v-btn>
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
    <v-dialog v-model="dialog" max-width="800px">
      <v-card class="flexcard" height="100%">
        <v-card-title class="text-h5 grey lighten-2">
          Thông tin tuyển dụng
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Tiêu đề tin tuyển dụng"
                v-model="dataQuery.jobTitle"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="dataQuery.amountEmployee"
                label="Số lượng"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="dataQuery.salary"
                label="Mức lương"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="dataQuery.position"
                label="Vị trí"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="dataQuery.address"
                label="Địa chỉ"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <!-- <v-text-field
                v-model="dataQuery.dateRecruitment"
                type="date"
                label="Hạn nộp hồ sơ"
                required
                outlined
              ></v-text-field> -->
              <input
                type="date"
                class="form-control"
                v-model="dataQuery.dateRecruitment"
              />

              <!-- <v-date-picker
                label="From Date"
                locale="en-in"
                v-model="dataQuery.dateRecruitment"
                no-title
              ></v-date-picker> -->
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="dataQuery.jobDescription"
                label="Mô tả công việc"
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
          <v-btn color="blue darken-1" text @click="submitEditRecruitment">
            Lưu
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {
  getRecruitmentById,
  getRecruitmentByEmployer,
  deleteRecruitment,
} from "../../../api/recruitments/recruitments";
import moment from "moment";

export default {
  name: "CompanyList",
  components: {},
  data() {
    return {
      listRecruitment: [],
      queryParams: {
        page: 1,
        size: 4,
      },
      model: 1,
      totalPage: 1,
      dialog: false,
      dataQuery: {},
    };
  },
  created() {
    this.getList();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
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
        console.log(response);
        if (response.status == 200) {
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
        console.log("response", response);
        this.dataQuery = response.data;
        this.dataQuery.dateRecruitment = moment(
          this.dataQuery.dateRecruitment
        ).format("yyyy-MM-dd");
        console.log(this.dataQuery);
      });
      this.dialog = true;
    },
    submitEditRecruitment() {
      console.log(this.dataQuery);
      this.dialog = false;
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
}
// Add the css below if your card has a toolbar, and if your toolbar's height increases according to the flex display.
.flexcard .v-toolbar {
  flex: 0;
}
</style>