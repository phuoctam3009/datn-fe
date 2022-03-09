<template>
  <div class="main">
    <v-card class="card-filter">
      <v-container class="is-search">
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="textQuery"
              outlined
              label="Tìm kiếm ..."
              dense
              @keydown.enter.prevent="query"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card>
      <v-container class="is-data-job">
        <div class="is-title">
          <span>Danh sách việc làm</span>
          <div class="is-line"></div>
        </div>
        <v-card
          class="card-job"
          v-for="(item, i) in listJob"
          :key="i"
          cols="4"
          hover
        >
          <v-row class="is-row-data">
            <v-col cols="2">
              <img
                :src="item.company.avatar"
                style="
                  width: 150px;
                  height: 150px;
                  object-fit: cover;
                  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
                "
              />
            </v-col>
            <v-col cols="8">
              <div class="content">
                <v-row>
                  <span style="font-weight: bold; font-size: 20px">{{
                    item.jobTitle
                  }}</span>
                </v-row>
                <v-row>
                  <v-col cols="6" class="is-col-data"
                    >Mức lương: {{ item.salary }}</v-col
                  >
                  <v-col cols="6" class="is-col-data"
                    >Số lượng: {{ item.amountEmployee }}</v-col
                  >
                  <v-col cols="6" class="is-col-data"
                    >Hạn ứng tuyển:
                    {{ formatDateRecruitment(item.dateRecruitment) }}
                  </v-col>
                  <v-col cols="6" class="is-col-data"
                    >Địa điểm: {{ item.address }}</v-col
                  >
                </v-row>
                <v-row
                  ><div class="job-description">
                    Mô tả: {{ item.jobDescription }}
                  </div>
                </v-row>
              </div>
            </v-col>
            <v-col cols="2" class="btn-detail">
              <v-btn color="success" @click="detailJob(item.id)"
                >Chi tiết</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
        <div v-if="totalPage < 1" style="text-align: center">
          Không tìm thấy kết quả
        </div>
      </v-container>
      <div class="text-center" style="padding: 20px 0 30px 0">
        <v-pagination
          v-if="totalPage > 0"
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
import {
  listRecruitments,
  queryRecruitments,
} from "../api/recruitments/recruitments";
import moment from "moment";

export default {
  name: "CompanyList",
  components: {},
  data() {
    return {
      listJob: [],
      queryParams: {
        page: 1,
        size: 4,
        textQuery: "",
      },
      totalPage: 1,
      textQuery: "",
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
      queryRecruitments(this.queryParams).then((response) => {
        if (response.status == 200) {
          this.listJob = response.data.content;
          this.totalPage = response.data.totalPages;
        }
      });
    },
    detailJob(jobId) {
      this.$router.push(`/job-detail/${jobId}`);
    },
    formatDateRecruitment(dateRecruitment) {
      return moment(String(dateRecruitment)).format("DD/MM/yyyy");
    },
    query() {
      this.resetQuery();
      this.queryParams.textQuery = this.textQuery;
      this.getRecruitments();
    },
    resetQuery() {
      this.queryParams.page = 1;
      this.queryParams.size = 4;
    },
  },
  watch: {
    queryParams: {
      handler(val) {
        this.getRecruitments();
      },
      deep: true,
    },
    textQuery: function (val) {
      if (!val) {
        this.resetQuery();
        this.queryParams.textQuery = "";
        this.getRecruitments();
      }
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
  /*padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;*/
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
  margin-bottom: 30px;
}

.btn-detail {
  display: flex;
  justify-content: center;
  align-items: center;
}

.is-data-job {
  //padding: 30px 0 0 0;
  padding-left: unset;
  padding-right: unset;
}

.is-search {
  padding-top: 30px;
}

.is-row-data {
  padding: 20px;
}

.is-col-data {
  padding-left: unset;
  padding-right: unset;
}

.is-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px 30px;
  font-size: 25px;
  color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  span {
    padding: 5px 10px;
    width: 50%;
    background: #00b14f;
    position: relative;

    &:after {
      content: "";
      position: absolute;
      top: -36px;
      right: -35px;
      width: 70px;
      height: 70px;
      transform: rotate(45deg);
      background-color: white; /* to see where it is */
    }
  }

  div {
    color: #00b14f;
    width: 50%;
    text-align: right;
  }
}

.is-line {
  margin-right: 10px !important;
  width: 250px !important;
  height: 3px;
  background: #00b14f;
}
.job-description {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>