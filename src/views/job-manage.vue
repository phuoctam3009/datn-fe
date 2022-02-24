<template>
  <div class="main">
    <v-card class="card-filter">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              outlined
              label="Tên công ty"
              medium
              required
              dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card>
      <v-container>
        <v-card
          class="card-job"
          v-for="(item, i) in listJob"
          :key="i"
          cols="4"
          hover
        >
          <v-row>
            <v-col cols="2">
              <img :src="item.company.avatar" style="width: 150px" />
            </v-col>
            <v-col cols="8">
              <div class="content">
                <v-row>
                  <span>{{ item.jobTitle }}</span>
                </v-row>
                <v-row>
                  <v-col cols="6">Mức lương: {{ item.salary }}</v-col>
                  <v-col cols="6">Số lượng: {{ item.amountEmployee }}</v-col>
                  <v-col cols="6"
                    >Hạn ứng tuyển: {{ formatDateRecruitment }}</v-col
                  >
                  <v-col cols="6">Địa điểm: {{ item.address }}</v-col>
                </v-row>
                <v-row> Mô tả: {{ item.jobDescription }} </v-row>
              </div>
            </v-col>
            <v-col cols="2" class="btn-detail">
              <v-btn color="success">Chi tiết</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
      <div class="text-center">
        <v-pagination
          v-model="queryParams.page"
          :length="totalPage"
          :total-visible="7"
          circle
        ></v-pagination>
      </div>
    </v-card>
  </div>
</template>
<script>
import { listRecruitments } from "../api/recruitments/recruitments";
export default {
  name: "CompanyList",
  components: {},
  data() {
    return {
      //API danh mục việc làm
      types: ["Foo", "Bar", "Fizz", "Buzz"],
      listJob: [],
      queryParams: {
        page: 1,
        size: 4,
      },
      model: 1,
      totalPage: 1,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.getRecruitments();
    },
    getRecruitments() {
      listRecruitments(this.queryParams).then((response) => {
        if (response.status == 200) {
          this.listJob = response.data.content;
          this.totalPage = response.data.totalPages;
          console.log(this.listJob);
        }
      });
    },
  },
  watch: {
    queryParams: {
      handler(val) {
        this.getRecruitments();
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
section {
  position: relative;
  padding: 96px 0;
  -webkit-background-size: cover;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
}
section.bg-alt {
  background-color: #fafafa;
}
.no-padding-top {
  padding-top: 0;
}
.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
.card-filter {
}
.button-filter {
  display: flex;
  flex-direction: row-reverse;
  line-height: 12px;
}

.flex {
  margin-top: 40px;
  .item-job {
    padding-top: 20px;
    .row {
      margin-left: 20px;
      padding-bottom: 20px;
      max-height: 120px;
      .col-8 {
        margin-left: 30px;
      }
      .row {
        display: flex;
        justify-content: center;
      }
    }
    .company-name {
      font-size: 25px;
    }
    h3 {
      font-size: 17px;
      margin-top: 6px;
      color: #96a2b2;
      font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
      font-weight: 300;
    }
  }
  .company-desc {
    padding: 20px 30px;
    span {
    }
  }
}

.type-job {
  padding: 5px 20px;
  display: inline-block;
}
form {
  margin-top: -150px;
}
.text-center {
  margin-top: 20px;
}
.company .box-company {
  background: #fff 0 0 no-repeat padding-box;
  border-radius: 5px;
  box-shadow: -1px 1px 4px #0000000d;
  height: 400px;
  margin-bottom: 24px;
  overflow: hidden;
}

.company .box-company .company-banner {
  height: 180px;
  margin-bottom: 16px;
  overflow: hidden;
  position: relative;
  width: 100px;
}
.company .box-company .company-banner .company-logo {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 5px;
  bottom: 0;
  height: 64px;
  left: 16px;
  position: absolute;
  width: 64px;
}
.company .box-company .company-info {
  padding: 0 16px;
}
.img-fluid {
  width: 100px;
}
.com-name {
  &:hover {
    text-decoration: underline;
  }
}
.card-job {
  margin: 10px 10px;
}
.btn-detail {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>