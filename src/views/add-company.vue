<template>
  <div class="main">
    <v-form>
      <v-card class="mx-auto job-content">
        <v-container class="header">
          <div class="title">
            <h1 class="text-center">Thêm một công ty mới</h1>
          </div>
          <hr />
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="2"> </v-col>
                <v-col cols="10">
                  <v-row>
                    <v-text-field label="Tên công ty" outlined></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field label="Tiêu đề" outlined></v-text-field>
                  </v-row>
                  <v-row>
                    <v-textarea
                      rows="3"
                      label="Mô tả ngắn"
                      outlined
                    ></v-textarea>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    outlined
                    label="Địa điểm"
                    prepend-inner-icon="mdi-map-marker"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    outlined
                    label="Số lượng"
                    prepend-inner-icon="mdi-account"
                    suffix="nhân viên"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    outlined
                    label="Website"
                    prepend-inner-icon="mdi-microsoft-internet-explorer"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    outlined
                    label="Thành lập"
                    prepend-inner-icon="mdi-cake-variant"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    outlined
                    label="Điện thoại"
                    prepend-inner-icon="mdi-phone"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    outlined
                    label="Email"
                    prepend-inner-icon="mdi-email"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-container>
      </v-card>
      <div class="network-content">
        <v-container class="content">
          <div class="title">
            <span>Kết nối</span>
            <h2>Mạng xã hội</h2>
          </div>
          <div class="social-network">
            <v-row>
              <v-col v-for="n in 6" :key="n" cols="6">
                <v-text-field
                  outlined
                  label="Profile facebook"
                  prepend-inner-icon="mdi-facebook"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </div>

      <div class="company-detail">
        <v-container> //TODO </v-container>
      </div>
      <v-row justify="center">
        <v-btn large right color="success">Tạo mới</v-btn>
      </v-row>
    </v-form>
  </div>
</template>
<script>
export default {
  name: "AddCompany",
  components: {},
  data() {
    return {
      itemsJob: [
        {
          icon: "mdi-inbox",
          text: "Inbox",
        },
        {
          icon: "mdi-star",
          text: "Star",
        },
        {
          icon: "mdi-send",
          text: "Send",
        },
        {
          icon: "mdi-email-open",
          text: "Drafts",
        },
      ],
      items: ["Full time", "Parttime", "Internship", "Freelance", "Remote"],
      itemsLevel: ["Cử nhân", "Thạc sĩ", "Tiến sĩ"],
    };
  },
};
</script>
<style lang="scss" scoped>
.title {
  text-align: center;
  padding-top: 25px;
  min-height: 90px;
}
.network-content {
  background: #fafafa;
  .content {
    padding-top: 50px;
    padding-right: 30px;
    padding-left: 40px;
    .header {
      text-align: center;
    }
    .social-network {
      margin-top: 100px;
    }
  }
}

.row {
  margin-top: 20px;
  .col-10 {
    .row {
      padding-top: 20px;
    }
  }
  div {
    margin-top: -15px;
  }
}
.title {
  text-align: center;
  span {
    color: #c8d0d7;
    font-family: Montserrat, sans-serif;
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
.company-detail {
}
</style>