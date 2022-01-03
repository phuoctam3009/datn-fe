<template>
  <div class="main">
    <v-card class="mx-auto job-content">
      <v-container class="header">
        <div class="title">
          <h1 class="text-center">Thêm một công việc mới</h1>
        </div>
        <hr />
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="Vị trí công việc"
                  placeholder="Ví dụ: Front-end developer"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Tên công ty"
                  placeholder="Công ty của tôi"
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  outlined
                  auto-grow
                  name="input-7-4"
                  label="Mô tả công việc"
                  value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                ></v-textarea>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  outlined
                  label="Địa chỉ"
                  prepend-inner-icon="mdi-map-marker"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-select
                  :items="items"
                  label="Yêu cầu"
                  outlined
                  clearable
                  :menu-props="{ top: false, offsetY: true }"
                  prepend-inner-icon="mdi-briefcase"
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  outlined
                  label="Thu nhập"
                  prepend-inner-icon="mdi-cash-100"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  outlined
                  label="Thời gian"
                  prepend-inner-icon="mdi-clock-outline"
                  suffix="giờ/tuần"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  outlined
                  label="Kinh nghiệm"
                  prepend-inner-icon="mdi-flask"
                  suffix="năm"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-select
                  :items="itemsLevel"
                  label="Trình độ"
                  outlined
                  clearable
                  :menu-props="{ top: false, offsetY: true }"
                  prepend-inner-icon="mdi-certificate"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-container>
    </v-card>
    <v-container class="content">
      <div class="header">
        <span>Mô tả công việc</span>
        <h2>Cụ thể công việc</h2>
        <p>
          Viết về công ty của bạn, mô tả công việc, các kỹ năng cần thiết, lợi
          ích, v.v.
        </p>
      </div>
      <div style="min-height: 500px">
        <h1>TODO EDITOR</h1>
      </div>
      <v-row justify="end">
        <v-btn large right color="success">Tạo mới</v-btn>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "AddJob",
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
.content {
  padding-top: 100px;
  padding-right: 30px;
  padding-left: 40px;
  .header {
    text-align: center;
  }
}
.row {
  margin-top: 20px;
  div {
    margin-top: -15px;
  }
}
</style>