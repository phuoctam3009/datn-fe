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
        <v-row>
          <v-col v-for="(item, i) in listCompany" :key="i" cols="4" hover>
            <div class="box-company item-hover">
              <div class="company-banner">
                <!-- <a href=""> -->
                <router-link
                  :to="{
                    name: 'CompanyDetail',
                    params: { companyId: item.id },
                  }"
                >
                  <div class="cover-wraper">
                    <img
                      :src="item.background"
                      alt="Công ty TNHH CMC GLOBAL"
                      class="img-fluid"
                    />
                  </div>
                </router-link>

                <!-- </a> -->
                <div class="company-logo">
                  <router-link
                    :to="{
                      name: 'CompanyDetail',
                      params: { companyId: item.id },
                    }"
                  >
                    <img
                      class="img-fluid"
                      :src="item.avatar"
                      alt="Công ty TNHH CMC GLOBAL"
                    />
                  </router-link>
                </div>
              </div>
              <div class="company-info">
                <h3>
                  <router-link
                    :to="{
                      name: 'CompanyDetail',
                      params: { companyId: item.id },
                    }"
                    style="text-decoration: none"
                    ><span class="com-name">{{ item.companyName }}</span>
                  </router-link>
                </h3>
                <div class="company-description">
                  <p>"{{ item.description }}"</p>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <div class="text-center">
        <v-pagination
          v-model="queryParams.page"
          :length="totalPage"
          :total-visible="5"
          circle
        ></v-pagination>
      </div>
    </v-card>
  </div>
</template>
<script>
import { getAllCompany } from "../api/company/company";
export default {
  name: "CompanyList",
  components: {},
  data() {
    return {
      //API danh mục việc làm
      itemCategories: ["Frontend", "Android", "IOS", "Fullstack"],
      types: ["Foo", "Bar", "Fizz", "Buzz"],
      listCompany: [],
      queryParams: {
        page: 1,
        size: 12,
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
      this.getCompanies();
    },
    getCompanies() {
      getAllCompany(this.queryParams).then((response) => {
        if (response.status == 200) {
          console.log(response.data);
          this.listCompany = response.data.content;
          console.log(this.listCompany);
          this.totalPage = response.data.totalPages;
        }
      });
    },
  },
  watch: {
    queryParams: {
      handler(val) {
        this.getCompanies();
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
</style>