<template>
  <div class="main">
    <v-container class="content">
      <div class="header">
        <h1>Quản lý hồ sơ cá nhân</h1>
      </div>
      <v-row justify="end">
        <v-btn color="cyan" min-width="262">Tạo hồ sơ mới</v-btn>
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
                  <h2 class="name-job">Front-end developer</h2>
                  <h3>Google</h3>
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
                <v-col cols="9">
                  <p class="status">
                    <strong>Ngày cập nhật:</strong> 01/03/2022
                  </p>
                </v-col>

                <v-col cols="3">
                  <v-btn depressed small color="primary"> Ẩn </v-btn>
                  <v-btn depressed small color="primary"> Sửa </v-btn>
                  <v-btn depressed small color="error"> Xóa </v-btn>
                  <v-btn depressed small color="success"> Chọn </v-btn>
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
  name: "ManageResume",
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
  h1 {
    font-size: 44px;
  }
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
      font-family: Arial,Helvetica Neue,Helvetica,sans-serif;
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
          font-family: Arial,Helvetica Neue,Helvetica,sans-serif;
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
        .col-3 {
          display: flex;
          justify-content: right;
          padding-right: 40px;
          button {
            display: none;
            margin-right: 5px;
          }
        }
      }
      .footer-card:hover {
        .col-3 button {
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