<template>
  <div class="is-main">
    <div class="is-statistic">
      <v-row>
        <!-- 1 -->
        <v-col cols="12" md="6" sm="6">
          <v-card class="mx-auto" max-width="344" elevation="2">
            <v-list-item two-line>
              <v-list-item-content>
                <div>
                  <v-list-item-avatar
                    tile
                    size="80"
                    elevation="9"
                    color="success"
                  >
                    <v-icon size="40" dark> mdi-check</v-icon>
                  </v-list-item-avatar>
                  <div class="text-right ml-auto mt-n15">
                    <div class="body-3 grey--text font-weight-light">
                      Công việc ứng tuyển
                    </div>
                    <h3 class="display-2 font-weight-light text--primary">1</h3>
                  </div>
                </div>
                <v-divider></v-divider>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" sm="6">
          <v-card class="mx-auto" max-width="344" elevation="2">
            <v-list-item two-line>
              <v-list-item-content>
                <div>
                  <v-list-item-avatar
                    tile
                    size="80"
                    elevation="9"
                    color="success"
                  >
                    <v-icon size="40" dark> mdi-check</v-icon>
                  </v-list-item-avatar>
                  <div class="text-right ml-auto mt-n15">
                    <div class="body-3 grey--text font-weight-light">
                      Hồ sơ đã t
                    </div>
                    <h3 class="display-2 font-weight-light text--primary">1</h3>
                  </div>
                </div>
                <v-divider></v-divider>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="content">
      <v-card class="mx-auto" elevation="5">
        <div class="widget widget-13" id="personalinfo-section">
          <div class="widget-head">
            <div class="cb-title-h3">
              <div class="figure">
                <div class="figcaption">
                  <h3>Thông tin cá nhân *</h3>
                  <div class="status-error" v-if="!checkProfile()">
                    <p>Chưa hoàn thành</p>
                  </div>
                  <div class="status-success" v-else>
                    <p>Hoàn thành</p>
                  </div>
                </div>
              </div>
              <div class="right-action">
                <div class="link-edit">
                  <p
                    class="is-tam"
                    href="javascript:void(0);"
                    @click="editProfile"
                  >
                    <em class="material-icons">create</em>
                    <span>Chỉnh sửa</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="widget-body">
            <div class="table">
              <table>
                <tbody>
                  <tr>
                    <td class="is-td-one">Avatar</td>
                    <td>
                      <img
                        :src="data.avatar"
                        style="width: 100px; height: 100px"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="is-td-one">Họ tên</td>
                    <td>{{ data.fullName }}</td>
                  </tr>
                  <tr>
                    <td class="is-td-one">Ngày sinh</td>
                    <td>{{ formatDate(data.birthday) }}</td>
                  </tr>
                  <tr>
                    <td class="is-td-one">Địa chỉ</td>
                    <td>{{ data.address }}</td>
                  </tr>
                  <tr>
                    <td class="is-td-one">Số điện thoại</td>
                    <td>{{ data.phone }}</td>
                  </tr>
                  <tr>
                    <td class="is-td-one">Ngôn ngữ</td>
                    <td>{{ data.position }}</td>
                  </tr>
                  <tr>
                    <td class="is-td-one">Kinh nghiệm</td>
                    <td>{{ data.experience }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </v-card>
    </div>
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">Chỉnh sửa thông tin cá nhân</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-row>
              <v-file-input
                accept="image/*"
                label="File input"
                @change="onFileChange"
                outlined
                dense
                prepend-icon="none"
              ></v-file-input>
              <div id="preview">
                <img v-if="url" :src="url" />
              </div>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Họ tên"
                  v-model="dataQuery.fullName"
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
                  <v-col cols="12">
                    <v-text-field
                      v-model="computedDateFormatted"
                      label="Ngày sinh"
                      outlined
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </v-col>
                </template>
                <v-date-picker v-model="dataQuery.birthday" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
              <!-- <v-col cols="12">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="computedDateFormatted"
                    label="Date (read only text field)"
                    hint="MM/DD/YYYY format"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  no-title
                  @input="menu2 = false"
                ></v-date-picker>
              </v-col> -->
              <v-col cols="12">
                <v-text-field
                  v-model="dataQuery.address"
                  label="Địa chỉ"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="dataQuery.phone"
                  label="Số điện thoại"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="dataQuery.position"
                  label="Ngôn ngữ"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="dataQuery.experience"
                  label="Kinh nghiệm"
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray darken-1" text @click="dialog = false">
            Đóng lại
          </v-btn>
          <v-btn color="blue darken-1" text @click="submitEditProfile">
            Lưu
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  listCandidates,
  getCandidateById,
  updateProfileCandidate,
} from "@/api/candidate/candidate";
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
    this.getCandidate();
  },
  mounted() {
    // if (!this.currentUser) {
    //   this.$router.push("/login");
    // }
  },
  methods: {
    getCandidate() {
      getCandidateById(this.currentUser.id).then((response) => {
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
</style>