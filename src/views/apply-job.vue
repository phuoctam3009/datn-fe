<template>
  <div class="main">
    <v-card class="mx-auto job-content">
      <v-container class="header">
        <div class="title">
          <h1>Aplly for the job</h1>
          <p>
            Apply with your online resume, create new resume for the job, or
            make a custom application.
          </p>
        </div>

        <hr />
        <v-row class="info-detail">
          <v-col cols="1">
            <img
              src="https://i.picsum.photos/id/1001/5616/3744.jpg?hmac=38lkvX7tHXmlNbI0HzZbtkJ6_wpWyqvkX4Ty6vYElZE"
              width="100"
              height="100"
            />
          </v-col>
          <v-col cols="8" class="info-job">
            <h1 class="name-job">Senior front-end developer</h1>
            <h3>Google</h3>
          </v-col>
          <v-col>
            <v-row style="flex-direction: row-reverse; padding-right: 12px">
              <span>Menlo Park, CA111222333</span>
              <v-icon medium> place </v-icon>
            </v-row>
            <h4 class="time">2 days ago</h4>
          </v-col>
        </v-row>
        <v-row class="footer" align="center" justify="end">
          <v-btn depressed color="primary"> CUSTOM APPLICATION </v-btn>
          <v-btn depressed color="error"> APPLY WITH A RESUME </v-btn>
        </v-row>
      </v-container>
    </v-card>
    <v-container class="content">
      <div class="header">
        <span>Apply with a resume</span>
        <h2>Select a resume</h2>
        <p>Applied for this job with one of your online available resumes</p>
      </div>
      <v-row justify="end">
        <v-btn color="cyan" min-width="262">ADD NEW RESUME</v-btn>
      </v-row>
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
                  <h2 class="name-job">John Doe</h2>
                  <h3>Front-end developer</h3>
                </v-col>
                <v-col align-self="end">
                  <v-row>
                    <v-icon medium> place </v-icon>
                    <span>Menlo Park, CA</span>
                  </v-row>
                  <v-row style="margin-top: 10px">
                    <v-icon medium> money </v-icon>
                    <span>$55 per hour</span>
                  </v-row>
                </v-col>
              </v-row>
            </div>
            <div class="footer-card">
              <v-row>
                <v-col cols="10">
                  <p class="status">
                    <strong>Updated on:</strong> March 10, 2016
                  </p>
                </v-col>

                <v-col cols="2">
                  <v-btn depressed small color="primary"> EDIT </v-btn>
                  <v-btn depressed small color="error"> SELECT </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "ApplyJob",
  components: {},
  data() {
    return {
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
    };
  },
};
</script>
<style lang="scss" scoped>
.header {
  padding: 0 30px;
  margin-bottom: 0px;
}
.header .title {
  text-align: center;
  height: 175px;
}

.header .title h1 {
  font-size: 44px;
  padding: 30px 0;
}

.job-content {
  border: 1px solid;
  width: 1200px;
  min-height: 500px;
  margin-top: -400px;
  margin-bottom: 0px;
}
.lead {
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 20px;
  margin-left: 10px;
}
.info-detail {
  margin-left: 10px;
  margin-top: 50px;
  margin-bottom: -10px;
}

.info-job {
  padding-left: 60px;
}

.content {
  padding-top: 100px;
  padding-right: 30px;
  padding-left: 40px;
  .header {
    text-align: center;

    span {
      color: #c8d0d7;
      font-family: Montserrat, sans-serif;
      font-size: 12px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    h2 {
      position: relative;
      margin-bottom: 48px;
      color: #55595c;
      text-transform: capitalize;
      font-size: 37px;
    }
    p {
      font-size: 18px;
    }
  }
  .justify-end {
    margin-right: 10px;
  }

  .column {
    .flex {
      padding-top: 20px;
      .item-job {
        padding-top: 20px;
        .name-job {
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
      .footer-card {
        background-color: #fdfdfd;
        max-height: 55px;
        .status {
          font-size: 13px;
          line-height: 22px;
          color: #96a2b2;
          padding-top: 10px;
          padding-left: 30px;
        }
        .col-10 {
          padding-left: 5px;
        }
        .col-2 button {
          display: none;
          margin-right: 10px;
        }
      }
      .footer-card:hover {
        .col-2 button {
          transition: color 0.3s linear;
          display: revert;
        }
      }
    }
    .row {
      margin-top: 20px;
      margin-left: 10px;
    }
  }
}

.time {
  text-align: right;
  padding-top: 10px;
  padding-right: 12px;
}

.footer {
  background-color: #fafafa;
  height: 85px;
  margin-left: -31px;
  margin-right: -31px;
  margin-top: 50px;
}
.footer button {
  margin-right: 40px;
}
</style>