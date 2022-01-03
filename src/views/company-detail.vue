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
            <h1 class="name-job">Google</h1>
            <h3>Internet and computer software</h3>
          </v-col>
        </v-row>
        <hr />
        <v-row>
          <span class="lead">
            Google Inc. is an American multinational technology company
            specializing in Internet-related services and products. These
            include online advertising technologies, search, cloud computing,
            and software. Most of its profits are derived from AdWords, an
            online advertising service that places advertising near the list of
            search results.
          </span>
        </v-row>
        <v-row class="info-detail">
          <v-col class="row" cols="4">
            <v-icon medium> place </v-icon>

            Menlo Park, CA</v-col
          >
          <v-col class="row" cols="4">
            <v-icon medium> perm_identity </v-icon>

            100-200 Nhân viên</v-col
          >
          <v-col class="row" cols="4">
            <v-icon medium> travel_explore </v-icon>
            <a href="#"> google.com </a>
          </v-col>
          <v-col class="row" cols="4">
            <v-icon medium> cake </v-icon>
            Từ năm 2000</v-col
          >
          <v-col class="row" cols="4">
            <v-icon medium> phone </v-icon>

            0123467890</v-col
          >
          <v-col class="row" cols="4">
            <v-icon medium> mail </v-icon>

            info@google.com</v-col
          >
        </v-row>
        <v-row class="footer">
          <v-col cols="8">
            <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon rounded>
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn color="success">Yêu thích</v-btn>
            <v-btn>Liên hệ</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-container class="content">
      <div class="title">
        <span>About</span>
        <h2>Giới thiệu công ty</h2>
      </div>
      <div>
        Google was founded by Larry Page and Sergey Brin while they were Ph.D.
        students at Stanford University. Together they own about 14 percent of
        its shares but control 56 percent of the stockholder voting power
        through supervoting stock. They incorporated Google as a privately held
        company on September 4, 1998. An initial public offering followed on
        August 19, 2004. Its mission statement from the outset was "to organize
        the world's information and make it universally accessible and useful,"
        and its unofficial slogan was "Don't be evil". In 2004, Google moved to
        its new headquarters in Mountain View, California, nicknamed the
        Googleplex. In August 2015, Google announced plans to reorganize its
        interests as a holding company called Alphabet Inc. When this
        restructuring took place on October 2, 2015, Google became Alphabet's
        leading subsidiary, as well as the parent for Google's Internet
        interests.
      </div>
    </v-container>
    <div class="job-info">
      <v-container class="job-available">
        <div class="title">
          <span>Thông tin tuyển dụng</span>
          <h2>Vị trí tuyển dụng</h2>
        </div>
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
                    <h2 class="name-job">Front-end developer</h2>
                    <h3>Google</h3>
                  </v-col>
                  <v-col align-self="center">
                    <span>34 phút trước</span>
                  </v-col>
                </v-row>
              </div>
              <div></div>
              <div class="footer-card">
                <v-row align-content="space-around">
                  <v-col v-for="n in 2" :key="n">
                    <v-icon medium> map </v-icon>
                    10-15 triệu
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>
<script>
export default {
  name: "CompanyDetail",
  components: {},
  data() {
    return {
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
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
  .row :first-of-type {
    .col-8 {
      margin-left: -45px;
    }
  }
}

.job-content {
  width: 1200px;
  min-height: 400px;
  margin-top: -300px;
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
.title {
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
  h2:after {
    position: absolute;
    left: 50%;
    margin-left: -24px;
    bottom: -26px;
    width: 48px;
    height: 2px;
    background-color: #29aafe;
    content: "";
  }
}
.job-info {
  background: #fafafa;
}
.job-available {
  .column {
    .flex {
      padding-top: 20px;
      .item-job {
        padding-top: 10px;
        .row {
          margin-left: 30px;
          .col-8 {
            margin-left: 25px;
          }
        }
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
          font-size: 15px;
          line-height: 22px;
          color: #96a2b2;
          padding-top: 10px;
          padding-left: 15px;
        }
        .col-10 {
          padding-left: 5px;
        }
      }
    }
    .row {
      margin-top: 20px;
      margin-left: 10px;
    }
  }
}

.footer {
  background-color: #fafafa;
  margin: 20px -30px -30px;
  .col-4 {
    display: flex;
    justify-content: end;
    button {
      margin-right: 15px;
    }
  }
}
</style>