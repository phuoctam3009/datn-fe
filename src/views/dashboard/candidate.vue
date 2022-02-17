<template>
  <div>
    <v-data-table
      height="600"
      fixed-header
      :headers="headers"
      :items="data"
      :server-items-length="total"
      :page.sync="queryParams.page"
      :items-per-page.sync="queryParams.size"
      :footer-props="{ 'items-per-page-options': [10, 20, 50] }"
      class="elevation-5"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Quản lý ứng viên</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <!-- <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Bạn có muốn xóa thông tin tuyển dụng này không?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <!-- <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon> -->
        <v-btn color="error" small @click="deleteItem(item)"> Xóa </v-btn>
      </template>
      <template v-slot:no-data>
        <span>Không có dữ liệu</span>
      </template>
      <template v-slot:item.avatar="{ item }">
        <div class="p-2">
          <v-img
            :src="item.avatar"
            alt="avatar"
            height="75px"
            width="75px"
            style="margin: 10px 0px"
          ></v-img>
        </div>
      </template>
      <template v-slot:item.birthday="{ item }">
        {{ formatDate(item.birthday) }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { listCandidates } from "@/api/candidate/candidate";
import moment from "moment";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Avatar",
        align: "start",
        sortable: false,
        value: "avatar",
        width: 100,
      },
      { text: "Họ và tên", value: "fullName", width: 200 },
      { text: "Vị trí", value: "position", width: 100 },
      { text: "Kinh nghiệm", value: "experience", width: 100 },
      { text: "Ngày sinh", value: "birthday", width: 100 },
      { text: "Số điện thoại", value: "phone", width: 100 },
      { text: "Địa chỉ", value: "address", width: 200 },
      {
        text: "Hành động",
        value: "actions",
        sortable: false,
        width: 100,
        align: "center",
      },
    ],
    data: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    queryParams: {
      page: 1,
      size: 10,
    },
    total: 0,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    queryParams: {
      handler(val) {
        this.getCandidates();
      },
      deep: true,
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.getCandidates();
    },
    getCandidates() {
      listCandidates(this.queryParams).then((response) => {
        if (response.status == 200) {
          console.log(response);
          this.data = response.data.content;
          this.total = response.data.totalElements;
        }
      });
    },
    formatDate(date) {
      if (date) {
        return moment(String(date)).format("DD/MM/yyyy");
      }
    },
    formatRoles(roles) {
      if (roles && roles.length > 0) {
        var result = "";
        roles.map((item) => {
          result += item.roleName + "";
        });
        return result;
      } else {
        return "";
      }
    },
    updateStatus(status, item) {
      this.$swal
        .fire({
          title: "Bạn chắc chắn thay đổi trạng thái thông tin tuyển dụng này?",
          showDenyButton: true,
          // showCancelButton: true,
          confirmButtonText: "Đồng ý",
          denyButtonText: `Hủy`,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            // this.$swal.fire("Saved!", "", "success");
            updateStatusRecruitment({ status, id: item.id }).then(
              (response) => {
                console.log("response", response);
                this.showToast("success", response.data);
                this.getRecruitments();
              }
            );
          } else if (result.isDenied) {
            this.getRecruitments();
          }
        });
      console.log(status);
    },

    editItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      // this.dialogDelete = true;
      this.$swal
        .fire({
          title: "Bạn chắc chắn muốn xóa thông tin tuyển dụng này?",
          showDenyButton: true,
          // showCancelButton: true,
          confirmButtonText: "Xóa",
          denyButtonText: `Hủy`,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.$swal.fire("Saved!", "", "success");
          } else if (result.isDenied) {
            this.$swal.fire("Changes are not saved", "", "info");
          }
        });
    },

    deleteItemConfirm() {
      this.data.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], this.editedItem);
      } else {
        this.data.push(this.editedItem);
      }
      this.close();
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
<style lang="scss" scoped>
</style>
