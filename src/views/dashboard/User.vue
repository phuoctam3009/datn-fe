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
          <v-toolbar-title>Quản lý người dùng</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="600px" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="success" dark v-bind="attrs" v-on="on">
                Thêm
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Thêm người dùng</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Tên đăng nhập"
                          v-model="user.username"
                          required
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="user.email"
                          label="Địa chỉ email"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="user.password"
                          label="Mật khẩu"
                          required
                          outlined
                          type="password"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-autocomplete
                          v-model="user.role"
                          :items="items"
                          label="Role"
                          multiple
                          outlined
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="gray darken-1" text @click="dialog = false">
                  Đóng lại
                </v-btn>
                <v-btn color="blue darken-1" text @click="addUser"> Lưu </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogEdit" max-width="600px" persistent>
            <v-card>
              <v-card-title>
                <span class="text-h5">Sửa người dùng</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Tên đăng nhập"
                          v-model="userEdit.username"
                          required
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="userEdit.email"
                          label="Địa chỉ email"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-autocomplete
                          v-model="userEdit.role"
                          :items="items"
                          label="Role"
                          multiple
                          outlined
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="gray darken-1" text @click="dialogEdit = false">
                  Đóng lại
                </v-btn>
                <v-btn color="blue darken-1" text @click="editUser">
                  Lưu
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
        <v-btn
          color="warning"
          style="margin-right: 10px"
          small
          @click="editItem(item)"
        >
          Sửa
        </v-btn>
        <v-btn color="error" small @click="deleteItem(item)"> Xóa </v-btn>
      </template>
      <template v-slot:no-data>
        <span>Không có dữ liệu</span>
      </template>
      <template v-slot:item.createTime="{ item }">
        {{ formatDate(item.createTime) }}
      </template>
      <template v-slot:item.roles="{ item }">
        {{ formatRoles(item.roles) }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { listUsers, deleteUser, getUser, updateInfo } from "@/api/user/user";
import moment from "moment";

export default {
  data: () => ({
    dialog: false,
    dialogEdit: false,
    dialogDelete: false,
    headers: [
      {
        text: "Tên người dùng",
        align: "start",
        sortable: false,
        value: "username",
        width: 200,
      },
      { text: "Địa chỉ email", value: "email", width: 200 },
      {
        text: "Ngày tạo",
        align: "center",
        width: 150,
        value: "createTime",
      },
      { text: "Role", align: "center", value: "roles", width: 200 },
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
    user: {},
    userEdit: {},
    items: [
      { text: "Ứng viên", value: "ROLE_CANDIDATE" },
      { text: "Nhà tuyển dụng", value: "ROLE_EMPLOYEE" },
      { text: "Admin", value: "ROLE_ADMIN" },
    ],

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
        this.getUsers();
      },
      deep: true,
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.getUsers();
    },
    getUsers() {
      listUsers(this.queryParams).then((response) => {
        if (response.status == 200) {
          console.log(response);
          this.data = response.data.content;
          this.total = response.data.totalElements;
        }
      });
    },
    addUser() {
      this.$store.dispatch("auth/register", this.user).then(
        (response) => {
          this.showToast("success", response.message);
          this.dialog = false;
          this.getUsers();
        },
        (error) => {
          this.showToast("error", error.response.data.message);
        }
      );
    },
    editUser() {
      updateInfo(this.userEdit).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error.response);
        }
      );
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
          result += "[" + item.roleName + "] ";
        });
        return result;
      } else {
        return "";
      }
    },

    editItem(item) {
      getUser(item.id).then(
        (response) => {
          console.log(response.data);
          this.userEdit = response.data;
          if (this.userEdit.roles && this.userEdit.roles.length > 0) {
            this.userEdit.role = this.userEdit.roles.map(
              (item) => item.roleName
            );
          }
        },
        (error) => {
          this.showToast("error", "Không tìm thấy user");
        }
      );
      this.dialogEdit = true;
    },

    deleteItem(item) {
      // this.dialogDelete = true;
      this.$swal
        .fire({
          title: "Bạn chắc chắn muốn xóa thông tin người dùng này?",
          showDenyButton: true,
          // showCancelButton: true,
          confirmButtonText: "Xóa",
          denyButtonText: `Hủy`,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            deleteUser(item.id).then(
              (response) => {
                this.showToast("success", response.data);
                this.getUsers();
              },
              (error) => {
                this.showToast("error", error.response.data.message);
                this.getUsers();
              }
            );
          }
        });
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
.v-data-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
}

.v-data-table__wrapper {
  margin-bottom: 60px;
}
</style>
