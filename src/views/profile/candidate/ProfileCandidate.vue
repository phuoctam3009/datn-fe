<template>
  <div>
    <div>
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
                    <v-icon size="40" dark> mdi-check </v-icon>
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
                    <v-icon size="40" dark> mdi-check </v-icon>
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
      <v-card class="mx-auto" min-width="800" min-height="600" elevation="5">
        <div class="widget widget-13" id="personalinfo-section">
          <div class="widget-head">
            <div class="cb-title-h3">
              <div class="figure">
                <div class="image">
                  <img src="" alt="" />
                </div>
                <div class="figcaption">
                  <h3>Thông tin cá nhân *</h3>
                  <div class="status error">
                    <p>Chưa hoàn thành</p>
                  </div>
                </div>
              </div>
              <div class="right-action">
                <div class="tips p1" onclick="openTipSlide('tip-personalinfo')">
                  <div class="icon">
                    <em class="mdi mdi-lightbulb"></em>
                  </div>
                  <p>Tips</p>
                </div>
                <div class="link-edit">
                  <a href="javascript:void(0);" onclick="editProfile();">
                    <em class="material-icons">create</em
                    ><span>Chỉnh sửa</span></a
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="widget-body">
            <div class="table">
              <table>
                <tbody>
                  <tr>
                    <td>Họ và Tên Lót</td>
                    <td>Nguyễn</td>
                  </tr>
                  <tr>
                    <td>Tên</td>
                    <td>Phước Tâm</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>phuoctam3009@gmail.com</td>
                  </tr>
                  <tr>
                    <td>Quốc tịch</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Tình trạng hôn nhân</td>
                    <td>Độc thân</td>
                  </tr>
                  <tr>
                    <td>Quốc gia</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      tab: null,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    // if (!this.currentUser) {
    //   this.$router.push("/login");
    // }
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
</style>