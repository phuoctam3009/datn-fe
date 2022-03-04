<template>
  <v-card class="center">
    <v-tabs v-model="tab">
      <v-tab key="1" @click="handleTab(1)">Ứng Viên</v-tab>
      <v-tab key="2" @click="handleTab(2)">Nhà tuyển dụng</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item eager style="height: 100%">
        <v-card flat>
          <v-content>
            <v-container fluid fill-height>
              <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                    <v-toolbar dark color="cyan">
                      <v-toolbar-title>Đăng ký ứng viên</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                      <v-form
                        ref="form1"
                        v-model="loading"
                        lazy-validation
                        @submit.prevent="validate"
                      >
                        <v-text-field
                          v-model="user.username"
                          prepend-icon="person"
                          name="login"
                          label="Tên đăng nhập"
                          :rules="nameRules"
                          type="text"
                          required
                          outlined
                        ></v-text-field>
                        <v-text-field
                          v-model="user.email"
                          prepend-icon="mail"
                          name="email"
                          label="Địa chỉ email"
                          :rules="[rules.email]"
                          type="email"
                          required
                          outlined
                        ></v-text-field>
                        <v-text-field
                          v-model="user.password"
                          prepend-icon="lock"
                          name="password"
                          label="Mật khẩu"
                          :rules="passwordRules"
                          type="password"
                          required
                          outlined
                        ></v-text-field>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="cyan"
                            @click="handleRegister"
                            :disabled="!loading"
                            block
                            >Đăng ký
                          </v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-content>
        </v-card>
      </v-tab-item>
      <v-tab-item eager style="height: 100%">
        <v-card flat>
          <v-content>
            <v-container fluid fill-height>
              <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                    <v-toolbar dark color="cyan">
                      <v-toolbar-title>Đăng ký nhà tuyển dụng</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                      <v-form
                        ref="form2"
                        v-model="loading"
                        lazy-validation
                        @submit.prevent="validate"
                      >
                        <v-text-field
                          v-model="user.username"
                          prepend-icon="person"
                          name="login"
                          label="Tên đăng nhập"
                          :rules="nameRules"
                          type="text"
                          required
                          outlined
                        ></v-text-field>
                        <v-text-field
                          v-model="user.email"
                          prepend-icon="mail"
                          name="email"
                          label="Địa chỉ email"
                          :rules="[rules.email]"
                          type="email"
                          required
                          outlined
                        ></v-text-field>
                        <v-text-field
                          v-model="user.password"
                          prepend-icon="lock"
                          name="password"
                          label="Mật khẩu"
                          :rules="passwordRules"
                          type="password"
                          required
                          outlined
                        ></v-text-field>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            @click="handleRegister"
                            :disabled="!loading"
                            block
                            color="cyan"
                            >Đăng ký
                          </v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-content>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import User from "../models/user";

export default {
  name: "Register",
  data: () => ({
    tab: null,
    loading: true,
    user: {},
    tabId: 1,
    nameRules: [
      (v) => !!v || "Tên đăng nhập là bắt buộc",
      (v) => (v && v.length > 4) || "Tên đăng nhập phải lớn hơn 4 ký tự",
    ],
    passwordRules: [
      (v) => !!v || "Mật khẩu là bắt buộc",
      (v) =>
        (v && v.length >= 6) || "Tên đăng nhập phải lớn hơn hoặc bằng 6 ký tự",
    ],
    confirmPasswordRules: [
      (value) => !!value || "type confirm password",
      (value) =>
        value === this.user.password || "Mật khẩu nhập lại không trùng khớp.",
    ],
    rules: {
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Email không hợp lệ";
      },
    },
  }),
  props: {
    source: String,
  },
  methods: {
    validate() {},
    handleRegister() {
      this.message = "";
      this.submitted = true;
      console.log("validate");
      if (this.$refs["form" + this.tabId].validate()) {
        this.$store.dispatch("auth/register", this.user).then(
          (data) => {
            console.log("data", data);
            this.$swal("Thành công", "Đăng ký thành công", "success").then(
              () => {
                this.$router.push("/login");
              }
            );
            this.successful = true;
          },
          (error) => {
            console.log("error", error.response);
            this.$swal("Thất bại", error.response.data.message, "error");
          }
        );
      } else {
        console.log("invalid");
      }
    },
    handleTab(tabId) {
      this.tabId = tabId;
      this.message = "";
      this.errorMessage = "";
      // this.$refs["form" + tabId].reset();
      this.user = {};
      if (tabId && tabId == 2) {
        //Nếu là nhà tuyển dụng
        this.user.role = ["ROLE_EMPLOYEE"];
      }
    },
  },

  // this.$validator.validateAll().then((isValid) => {
  //   if (this.user.username && this.user.password) {
  //     this.$store.dispatch("auth/login", this.user).then(
  //       () => {
  //         this.$router.push("/profile");
  //       },
  //       (error) => {
  //         this.loading = false;
  //         this.message =
  //           (error.response &&
  //             error.response.data &&
  //             error.response.data.message) ||
  //           error.message ||
  //           error.toString();
  //       }
  //     );
  //   }
  // });
};
</script>

<style lang="scss" scoped>
body {
  height: 100vh !important;
}

.center {
  margin-top: 5px;
  //padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
  height: calc(100vh - 130px);
}

.v-window {
  height: 100%;

  .v-card {
    height: 100%;

    .v-content {
      height: 100%;
      background-image: url("https://images.unsplash.com/photo-1532688062201-dea3c56514b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80");
      background-size: cover;
    }
  }
}

.v-card__actions {
  padding: unset;
}
</style>
