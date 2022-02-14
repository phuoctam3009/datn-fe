<template>
  <div class="page-wrapper">
    <!-- <div class="page" :id="$route.params.resumeid"> -->
    <div class="page-inner">
      <component
        :is="$route.params.resumeid"
        :itemSelectedLeft="itemSelectedLeft"
        :itemSelectedRight="itemSelectedRight"
        :statusSaveResume="saveResume"
        @getInfoData="getData"
      ></component>
    </div>
    <div class="custom-resume">
      <custom-resume
        @setSelectedLeft="getSelectedLeft"
        @setSelectedRight="getSelectedRight"
        @setSaveResume="updateSaveResume"
      ></custom-resume>
    </div>
    <!-- <v-btn>Export PDF</v-btn> -->
    <!-- </div> -->
  </div>
</template>

<script>
import "../resumes/resumes.js";
import CustomResume from "./custom-resume.vue";
import { addResume } from "../api/resume/resume";
export default {
  name: "resume",
  components: {
    CustomResume,
  },
  data() {
    return {
      itemSelectedLeft: ["Kỹ năng", "Sở thích"],
      itemSelectedRight: [
        "Kinh nghiệm làm việc",
        "Học vấn",
        "Hoạt động",
        "Thành tích",
      ],
      saveResume: false,
    };
  },
  methods: {
    getSelectedLeft(list) {
      this.itemSelectedLeft = list;
    },
    getSelectedRight(list) {
      this.itemSelectedRight = list;
    },
    updateSaveResume(val) {
      this.saveResume = val;
    },
    getData(data) {
      var payloadRequest = {
        userId: this.$store.state.auth.user.id,
        data: JSON.stringify(data),
        title: data.title,
      };
      addResume(payloadRequest)
        .then((response) => {
          this.$swal("Thành công", response.data, "success").then(() => {
            this.$router.push("/profile");
          });
        })
        .catch((error) => {
          this.$swal("Thất bại", error.response.data.error, "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.page-inner {
  height: 100%;
  min-height: unquote("-webkit-calc(100vh - 64px)");
  width: 70%;
}
.custom-resume {
  display: relative;
  width: 30%;
  margin-left: 10px;
  padding: 15px 15px;
  background: white;
}
.page-wrapper {
  display: flex;
  overflow-x: hidden;
  background: #cccccc;
  // min-height: unquote("-webkit-calc(100vh - 140px)");
  margin: 0;
  padding: 0;
  -webkit-print-color-adjust: exact;
  box-sizing: border-box;
}

.resume {
  height: 100%;
  width: 100%;
}

.page {
  background: white;
  position: relative;
  width: 21cm;
  height: 29.68cm;
  display: block;
  page-break-after: auto;
  overflow: hidden;
}
</style>
