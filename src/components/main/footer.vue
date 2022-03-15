<template>
  <v-footer
    style="background: #519259; position: relative; z-index: 999999"
    padless
  >
    <v-row align="center" justify="center" style="margin-left: 100px">
      <v-col style="color: white" class="py-4" cols="3">
        <img
          src="../../assets/logo/logo.png"
          alt="MyJob tuyển dụng"
          title="MyJob tuyển dụng"
          class=""
          style="height: 50px"
        />
      </v-col>
      <v-col style="color: white; text-align: left" class="py-4" cols="3">
        <p>Việc Làm Phù Hợp Với Bạn</p>
        <p>Quy Định Bảo Mật</p>
        <p>Thỏa Thuận Sử Dụng</p>
        <p>Chính Sách BV Thông Tin Cá Nhân</p>
      </v-col>
      <v-col style="color: white; text-align: left" class="py-4" cols="3">
        <p style="display: flex">
          <img
            style="width: 20px; height: 20px; margin-right: 10px"
            src="../../assets/icons/facebook.png"
            alt=""
          />Facebook
        </p>

        <p style="display: flex">
          <img
            style="width: 20px; height: 20px; margin-right: 10px"
            src="../../assets/icons/linkedin.png"
            alt=""
          />Linkedin
        </p>

        <p style="display: flex">
          <img
            style="width: 20px; height: 20px; margin-right: 10px"
            src="../../assets/icons/youtube.png"
            alt=""
          />Youtube
        </p>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import Logo from "./logo";

export default {
  name: "footer",
  props: {
    light: {
      type: Boolean,
      default: false,
    },
  },
  components: { Logo },

  data() {
    return {
      links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
    };
  },
};
</script>
<style lang="scss" scoped>
.e-footer {
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-content: stretch;
  flex-direction: column;

  &.phone {
    min-height: 400px;
  }

  .footer-watermark {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00b14f;
    line-height: 1.6rem;
    width: 100%;
    padding: 2rem 0;
  }

  .row-container {
    line-height: 1.9rem;
  }
}
</style>