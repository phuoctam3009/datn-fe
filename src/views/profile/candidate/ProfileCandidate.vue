<template>
    <div class="is-main">
        <div class="is-statistic">
            <v-row>
                <!-- 1 -->
                <v-col cols="12" md="6" sm="6">
                    <v-card class="mx-auto" max-width="344" elevation="2">
                        <v-list-item two-line>
                            <v-list-item-content>
                                <div>
                                    <v-list-item-avatar
                                            tile
                                            size="80"
                                            elevation="9"
                                            color="success"
                                    >
                                        <v-icon size="40" dark> mdi-check</v-icon>
                                    </v-list-item-avatar>
                                    <div class="text-right ml-auto mt-n15">
                                        <div class="body-3 grey--text font-weight-light">
                                            Công việc ứng tuyển
                                        </div>
                                        <h3 class="display-2 font-weight-light text--primary">1</h3>
                                    </div>
                                </div>
                                <v-divider></v-divider>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6" sm="6">
                    <v-card class="mx-auto" max-width="344" elevation="2">
                        <v-list-item two-line>
                            <v-list-item-content>
                                <div>
                                    <v-list-item-avatar
                                            tile
                                            size="80"
                                            elevation="9"
                                            color="success"
                                    >
                                        <v-icon size="40" dark> mdi-check</v-icon>
                                    </v-list-item-avatar>
                                    <div class="text-right ml-auto mt-n15">
                                        <div class="body-3 grey--text font-weight-light">
                                            Hồ sơ đã t
                                        </div>
                                        <h3 class="display-2 font-weight-light text--primary">1</h3>
                                    </div>
                                </div>
                                <v-divider></v-divider>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <div class="content">
            <v-card class="mx-auto" elevation="5">
                <div class="widget widget-13" id="personalinfo-section">
                    <div class="widget-head">
                        <div class="cb-title-h3">
                            <div class="figure">
                                <div class="figcaption">
                                    <h3>Thông tin cá nhân *</h3>
                                    <div class="status">
                                        <p>Chưa hoàn thành</p>
                                    </div>
                                </div>
                            </div>
                            <div class="right-action">
                                <div class="link-edit">
                                    <p class="is-tam" href="javascript:void(0);" onclick="editProfile();">
                                        <em class="material-icons">create</em>
                                        <span>Chỉnh sửa</span></p
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="widget-body">
                        <div class="table">
                            <table>
                                <tbody>
                                <tr>
                                    <td class="is-td-one">Họ và Tên Lót</td>
                                    <td>Nguyễn</td>
                                </tr>
                                <tr>
                                    <td class="is-td-one">Tên</td>
                                    <td>Phước Tâm</td>
                                </tr>
                                <tr>
                                    <td class="is-td-one">Email</td>
                                    <td>phuoctam3009@gmail.com</td>
                                </tr>
                                <tr>
                                    <td class="is-td-one">Quốc tịch</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td class="is-td-one">Tình trạng hôn nhân</td>
                                    <td>Độc thân</td>
                                </tr>
                                <tr>
                                    <td class="is-td-one">Quốc gia</td>
                                    <td></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Profile",
        data() {
            return {
                tab: null,
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            };
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
        },
        mounted() {
            // if (!this.currentUser) {
            //   this.$router.push("/login");
            // }
        },
    };
</script>
<style lang="scss" scoped>
    .container {
        margin: auto;
        width: 60%;
        padding: 0 15px;
        margin-right: auto;
        margin-left: auto;
    }

    .tab-item {
        display: flex;
        justify-content: center;
        height: 82vh;

        .v-card {
            margin-top: 10px;
            width: 50%;
        }
    }

    .box-title {
        border-left: 7px solid #00b14f;
        color: #333;
        font-size: 22px;
        font-weight: 700;
        margin: 0 0 16px;
        padding-left: 12px;
        text-align: initial;
    }

    .is-statistic {
        margin: 50px 0;
    }

    .content {
        margin: 0 50px;
    }

    .is-main {
        min-height: unset;
    }

    #personalinfo-section {
        padding: 30px;
    }

    .widget-head {
        margin-bottom: 10px;
    }

    .cb-title-h3 {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .right-action {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .tipsss {
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
            margin-bottom: unset;
        }

        margin-right: 10px;
    }

    .status p {
        color: red;
        margin-bottom: unset;
    }

    .is-tam {
        margin-bottom: unset;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #29aafe;
        padding: 5px 10px;
        color: #29aafe;
        border-radius: 999999999px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;

        &:hover {
            color: black;

            em {
                color: #29aafe;
            }
        }

        em {
            margin-right: 5px;
        }
    }

   .is-td-one {
       width: 200px;
       font-weight: bold;
       padding-bottom: 10px;
   }
</style>