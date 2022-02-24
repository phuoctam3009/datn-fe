<template>
  <v-card class="mx-auto">
    <div>Danh sách CV</div>
    <v-row dense>
      <v-col v-for="card in cards" :key="card.title" :cols="3">
        <v-card class="card-cv">
          <div class="resume-info" @click="previewCV(card.id)">
            <v-img
              :src="card.avatar || avatarDefault"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="300px"
            >
              <v-card-title
                v-text="card.title ? card.title : 'Tiêu đề CV'"
              ></v-card-title>
            </v-img>
          </div>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" @click="editCV(card.id)"> Sửa </v-btn>
            <v-btn color="error" @click="removeCV(card.id)"> Xóa </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { getResumes, deleteResumeById } from "@/api/resume/resume";

export default {
  data: () => ({
    cards: [],
    avatarDefault: require("../../../../resume/id.jpg"),
  }),
  created() {
    this.getListResumes();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    getListResumes() {
      getResumes(this.currentUser.id).then((response) => {
        if (response.status == 200) {
          this.cards = response.data;
        }
      });
    },
    removeCV(resumeId) {
      console.log(resumeId);
      this.$swal
        .fire({
          title: "Bạn chắc chắn muốn xóa CV này?",
          showDenyButton: true,
          confirmButtonText: "Đồng ý",
          denyButtonText: `Hủy`,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            // this.$swal.fire("Saved!", "", "success");
            deleteResumeById(resumeId).then((response) => {
              this.showToast("success", response.data);
              this.getListResumes();
            });
          } else if (result.isDenied) {
            this.getListResumes();
          }
        });
    },
    editCV(resumeId) {
      this.$router.push(`/resume/material-dark/${resumeId}?q=edit`);
    },
    previewCV(resumeId) {
      console.log(resumeId);
      this.$router.push(`/resume/material-dark/${resumeId}`);
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
  },
};
</script>
<style scoped>
.mx-auto {
  margin-top: 80px;
}
.card-cv {
  margin: 10px 10px;
}
.resume-info:hover {
  cursor: pointer;
}
</style>