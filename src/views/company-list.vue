<template>
  <div class="main">
    <v-card class="mx-auto card-filter">
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="firstname"
                :rules="nameRules"
                outlined
                label="Từ khóa"
                medium
                required
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="lastname"
                :rules="nameRules"
                outlined
                label="Địa điểm"
                required
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-select
                v-model="test"
                :items="itemCategories"
                label="Vị trí"
                dense
                outlined
                clearable
                :menu-props="{ top: false, offsetY: true }"
              ></v-select>
            </v-col>
            <v-row class="flex-row-reverse">
              <v-btn style="margin-right: 20px" color="green">Tìm kiếm </v-btn>
            </v-row>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    <v-layout column>
      <v-flex v-for="(item, i) in itemsJob" :key="i">
        <v-card class="mx-auto pa-20" max-width="1200" hover>
          <div class="item-job">
            <v-row>
              <img
                src="https://i.picsum.photos/id/1001/5616/3744.jpg?hmac=38lkvX7tHXmlNbI0HzZbtkJ6_wpWyqvkX4Ty6vYElZE"
                width="100"
                height="100"
              />
              <v-col cols="8">
                <h2 class="company-name">Google</h2>
                <h3>Internet and computer software</h3>
              </v-col>
              <v-col align-self="end">
                <v-row>
                  <span>15 vị trí</span>
                </v-row>
              </v-col>
            </v-row>
            <hr />
          </div>
          <div class="company-desc">
            <span>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et
              obcaecati odit earum odio dicta natus corporis assumenda
              molestiae. Rerum totam molestias aut. Laudantium rem saepe tempora
              doloribus soluta nam assumenda.
            </span>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
    <div class="text-center">
      <v-pagination v-model="page" :length="4" circle></v-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "CompanyList",
  components: {},
  data() {
    return {
      //API danh mục việc làm
      itemCategories: ["Frontend", "Android", "IOS", "Fullstack"],
      types: ["Foo", "Bar", "Fizz", "Buzz"],
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
      categoriesFilter: [
        {
          type: "Hourly rate",
          items: ["Filter 1", "Filter 2", "Filter 3", "Filter 4"],
        },
        {
          type: "Academic degree",
          item: ["Filter 1", "Filter 1", "Filter 1", "Filter 1"],
        },
        {
          type: "Sort by",
          item: ["Filter 1", "Filter 1", "Filter 1", "Filter 1"],
        },
      ],
      model: 1,
    };
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
  width: 1200px;
  margin-top: 10px;
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
      font-family: Open Sans, sans-serif;
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
</style>