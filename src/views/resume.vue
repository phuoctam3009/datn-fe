<template>
  <div class="page-wrapper">
    <!-- <div class="page" :id="$route.params.resumeid"> -->
    <div class="page-inner">
      <component
        :is="$route.params.resumeid"
        :itemSelectedLeft="itemSelectedLeft"
        :itemSelectedRight="itemSelectedRight"
      ></component>
    </div>
    <div class="custom-resume">
      <custom-resume
        @setSelectedLeft="getSelectedLeft"
        @setSelectedRight="getSelectedRight"
      ></custom-resume>
    </div>
    <!-- <v-btn>Export PDF</v-btn> -->
    <!-- </div> -->
  </div>
</template>

<script>
import "../resumes/resumes.js";
import CustomResume from "./custom-resume.vue";
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
    };
  },
  methods: {
    getSelectedLeft(list) {
      this.itemSelectedLeft = list;
    },
    getSelectedRight(list) {
      this.itemSelectedRight = list;
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
