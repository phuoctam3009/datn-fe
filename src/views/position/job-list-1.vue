<template>
  <div class="main">
    <v-card class="mx-auto card-filter">
      <v-form v-model="valid" style="border: 1px solid">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="firstname"
                :rules="nameRules"
                label="Keyword: job title, skills, or company"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="lastname"
                :rules="nameRules"
                label="Location: city, state or zip"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-select
                style="margin-top: 8px"
                v-model="test"
                :items="itemCategories"
                label="All categories"
                dense
                outlined
                clearable
                :menu-props="{ top: false, offsetY: true }"
              ></v-select>
            </v-col>
            <!-- <v-col
              cols="12"
              md="4"
              v-for="(category, index) in categoriesFilter"
              :key="index"
            >
              <h3>{{ category.type }}</h3>
              <v-layout row>
                <v-flex v-for="(item, i) in category['items']" :key="i" xs12>
                  <v-checkbox light :label="item"> </v-checkbox>
                </v-flex>
              </v-layout>
            </v-col> -->

            <v-col cols="12" md="4">
              <h3>Contract</h3>
              <v-layout row>
                <v-flex
                  v-for="(category, index) in types"
                  :key="types[index].text"
                  xs12
                >
                  <v-checkbox
                    light
                    :label="category"
                    v-model="category.selected"
                  >
                  </v-checkbox>
                </v-flex>
              </v-layout>
            </v-col>
            <v-col cols="12" md="4">
              <h3>Contract</h3>
              <v-layout row>
                <v-flex
                  v-for="(category, index) in types"
                  :key="types[index].text"
                  xs12
                >
                  <v-checkbox
                    light
                    :label="category"
                    v-model="category.selected"
                  >
                  </v-checkbox>
                </v-flex>
              </v-layout>
            </v-col>
            <v-col cols="12" md="4">
              <h3>Contract</h3>
              <v-layout row>
                <v-flex
                  v-for="(category, index) in types"
                  :key="types[index].text"
                  xs12
                >
                  <v-checkbox
                    light
                    :label="category"
                    v-model="category.selected"
                  >
                  </v-checkbox>
                </v-flex>
              </v-layout>
            </v-col>
            <v-row class="flex-row-reverse">
              <v-btn style="margin-right: 20px" color="green"
                >Apply filter</v-btn
              >
            </v-row>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    <section class="no-padding-top bg-alt">
      <v-container>
        <v-row>
          <v-col style="margin-left: 50px" cols="8" md="12">
            <h2>
              We found <strong>357</strong> matches, you're watching
              <i>10</i> to <i>20</i>
            </h2>
          </v-col>
        </v-row>
        <v-layout wrap>
          <v-flex v-for="(item, i) in itemsJob" :key="i">
            <v-card
              class="mx-auto pa-20"
              max-width="1200"
              hover
              :to="'/job-detail'"
            >
              <div class="item-job">
                <header class="row">
                  <img
                    src="https://i.picsum.photos/id/1001/5616/3744.jpg?hmac=38lkvX7tHXmlNbI0HzZbtkJ6_wpWyqvkX4Ty6vYElZE"
                    width="100"
                    height="100"
                  />
                  <div>
                    <h4 class="name-job">Senior front-end developer</h4>
                    <h5>
                      Google
                      <div class="type-job green">
                        <span class="white--text">FullTime</span>
                      </div>
                    </h5>
                  </div>
                </header>
                <br />
                <div class="item-body">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Labore, nemo ipsam aliquam facere, eaque et, alias voluptate
                    natus non soluta velit molestias doloribus porro neque
                    inventore quisquam odio rerum architecto!
                  </p>
                </div>
                <footer>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-icon medium> place </v-icon>
                      <span>Menlo Park</span>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-icon medium> money </v-icon>
                      <span>$90,000 - $110,000 / year</span>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-icon medium> done </v-icon>
                      <span>Master</span>
                    </v-col>
                  </v-row>
                </footer>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
  </div>
</template>
<script>
export default {
  name: "JobList1",
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
  border: 1px solid;
  width: 1200px;
  /* min-height: 500px; */
  margin-top: 10px;
}
.button-filter {
  display: flex;
  flex-direction: row-reverse;
  line-height: 12px;
}
.item-job {
  margin-bottom: 30px;
}

.item-job .row {
  margin-left: 10px;
}
.item-job div {
  margin-left: 20px;
}

.name-job {
  font-size: 25px;
  color: black;
  font-family: Open Sans, sans-serif;
  font-weight: 300;
  margin: 0;
}
.type-job {
  padding: 5px 20px;
  display: inline-block;
}
</style>