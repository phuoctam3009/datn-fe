<template>
  <div class="main">
    <v-card class="mx-auto job-content">
      <v-container class="header">
        <v-row>
          <v-col cols="2">
            <img
              src="https://i.picsum.photos/id/1001/5616/3744.jpg?hmac=38lkvX7tHXmlNbI0HzZbtkJ6_wpWyqvkX4Ty6vYElZE"
              width="100"
              height="100"
            />
          </v-col>
          <v-col cols="8">
            <h1 class="name-job">Senior front-end developer</h1>
            <h3>
              Google
              <div class="type-job green">
                <span class="white--text">FullTime</span>
              </div>
            </h3>
          </v-col>
          <v-col cols="2">
            <h2>2 days ago</h2>
          </v-col>
        </v-row>
        <hr />
        <v-row>
          <p class="lead">
            You will help Google build next-generation web applications like
            Gmail, Google Docs, Google Analytics, and the Google eBookstore and
            eBook readers. As a Front End Engineer at Google, you will
            specialize in building responsive and elegant web UIs with AJAX and
            similar technologies. You may design or work on frameworks for
            building scalable frontend applications. We are looking for
            engineers who are passionate about and have experience building
            leading-edge user experience, including dynamic consumer
            experiences.
          </p>
        </v-row>
        <v-row class="info-detail">
          <v-col class="row" cols="4">
            <v-icon medium> place </v-icon>

            Menlo Park, CA</v-col
          >
          <v-col class="row" cols="4">
            <v-icon medium> calendar_today </v-icon>

            Full time</v-col
          >
          <v-col class="row" cols="4">
            <v-icon medium> paid </v-icon>
            $90,000 - $110,000 / year
          </v-col>
          <v-col class="row" cols="4">
            <v-icon medium> schedule </v-icon>
            40h / week</v-col
          >
          <v-col class="row" cols="4">
            <v-icon medium> star_rate </v-icon>

            2+ years experience</v-col
          >
          <v-col class="row" cols="4">
            <v-icon medium> done </v-icon>

            Master or Bachelor</v-col
          >
        </v-row>
        <v-row class="footer">
          <v-col cols="4">SHARE ON</v-col>
          <v-col cols="4"></v-col>
          <v-col cols="4">
            <v-btn style="float: right" color="green">APPLY NOW</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-container class="content">
      <p>
        Google is and always will be an engineering company. We hire people with
        a broad set of technical skills who are ready to tackle some of
        technology's greatest challenges and make an impact on millions, if not
        billions, of users. At Google, engineers not only revolutionize search,
        they routinely work on massive scalability and storage solutions,
        large-scale applications and entirely new platforms for developers
        around the world. From AdWords to Chrome, Android to YouTube, Social to
        Local, Google engineers are changing the world one technological
        achievement after another.
      </p>
      <h4>Responsibilities</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem
        laboriosam perspiciatis nihil, reprehenderit numquam ab minus deleniti
        illum laborum molestias corporis aut eum accusamus veritatis aspernatur
        ipsam ipsa delectus aliquid.
      </p>
      <ul>
        <li>
          Build next-generation web applications with a focus on the client
          side.
        </li>
        <li>
          Build next-generation web applications with a focus on the client
          side.
        </li>
        <li>
          Build next-generation web applications with a focus on the client
          side.
        </li>
        <li>
          Build next-generation web applications with a focus on the client
          side.
        </li>
      </ul>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "JobDetails",
  components: {},
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.header {
  padding: 0 30px;
}

.job-content {
  border: 1px solid;
  width: 1200px;
  min-height: 500px;
  margin-top: -400px;
}
.lead {
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 20px;
  margin-left: 10px;
}
.info-detail {
  margin-left: 10px;
}

.content {
  padding-top: 100px;
  padding-right: 30px;
  padding-left: 40px;
}

.footer {
  background-color: #f7e8e8;
  margin-top: 20px;
}
</style>