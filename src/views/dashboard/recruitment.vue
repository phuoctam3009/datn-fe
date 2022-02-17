<template>
  <v-data-table
    height="600"
    fixed-header
    :headers="headers"
    :items="data"
    :server-items-length="total"
    :page.sync="queryParams.page"
    :items-per-page.sync="queryParams.size"
    :footer-props="{ 'items-per-page-options': [10, 20, 50] }"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Quản lý tin tuyển dụng</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Tiêu đề"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="editedItem.calories"
                      label="Số lượng"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="editedItem.fat"
                      label="Chức vụ"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Vị trí"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
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
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:no-data>
      <span>Không có dữ liệu</span>
    </template>
    <template v-slot:item.dateRecruitment="{ item }">
      {{ formatDate(item.dateRecruitment) }}
    </template>
    <template v-slot:item.active="{ item }">
      <v-switch
        v-model="item.active"
        color="success"
        @change="updateStatus(item.active, item)"
      ></v-switch>
      <!-- {{ item.active }} -->
    </template>
  </v-data-table>
</template>

<script>
import {
  listRecruitments,
  updateStatusRecruitment,
} from "@/api/recruitments/recruitments";
import moment from "moment";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Tên công ty",
        align: "start",
        sortable: false,
        value: "company.companyName",
      },
      { text: "Tên công việc", value: "jobTitle" },
      {
        text: "Số lượng tuyển",
        align: "center",
        value: "amountEmployee",
        width: 200,
      },
      { text: "Hạn nộp", value: "dateRecruitment", align: "center" },
      { text: "Địa chỉ", value: "company.address" },
      { text: "Mức lương", value: "salary", sortable: false, width: 135 },
      { text: "Trạng thái", value: "active", sortable: false, width: 100 },
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
    total: 1,
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
        this.getRecruitments();
      },
      deep: true,
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.getRecruitments();
    },
    getRecruitments() {
      listRecruitments(this.queryParams).then((response) => {
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
