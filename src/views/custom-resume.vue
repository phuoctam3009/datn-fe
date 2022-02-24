<template>
  <div>
    <h1>Tips:</h1>
    <ul>
      <li>Ấn trực tiếp vào các phần thông tin để chỉnh sửa</li>
      <li>Bấm nút "Lưu hồ sơ" để lưu thông tin hồ sơ</li>
      <li>Tích chọn mục bạn muốn hiển thị ra hồ sơ</li>
        <v-card max-width="530" class="card-select">
          <div v-for="(item, index) in leftSide" :key="index">
            <v-checkbox v-model="selectedLeft" :label="item" :value="item">
            </v-checkbox>
          </div>
          <v-divider></v-divider>
          <div v-for="item in rightSide" :key="item">
            <v-checkbox v-model="selectedRight" :label="item" :value="item">
            </v-checkbox>
          </div>
        </v-card>
    </ul>
    <v-btn elevation="2" block color="secondary" @click="saveResume"
      >Lưu hồ sơ</v-btn
    >
  </div>
</template>
<script>
export default {
  name: "CustomResume",
  data() {
    return {
      selectedLeft: ["Kỹ năng", "Sở thích"],
      selectedRight: [
        "Kinh nghiệm làm việc",
        "Học vấn",
        "Hoạt động",
        "Thành tích",
      ],
      leftSide: ["Kỹ năng", "Sở thích"],
      rightSide: ["Kinh nghiệm làm việc", "Học vấn", "Hoạt động", "Thành tích"],
    };
  },
  watch: {
    selectedLeft: {
      handler: function (val, oldVal) {
        this.$emit("setSelectedLeft", val);
      },
      deep: true,
    },
    selectedRight: {
      handler: function (val, oldVal) {
        this.$emit("setSelectedRight", val);
      },
      deep: true,
    },
  },
  methods: {
    saveResume() {
      this.$emit("setSaveResume", true);
    },
  },
};
</script>
<style lang="scss" scoped>
.card-select {
  padding: 10px 10px;
  margin-top: 5px;
  margin-right: 15px;
  //   position: absolute;
  //   right: 50px;
  //   top: 50px;
}
ul {
  list-style-type: "🔔 ";
}
.v-input__slot {
  margin-bottom: 0px;
}
button {
  margin-top: 10px;
}
</style>