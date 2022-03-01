<template>
    <v-footer style="background: #71cd95; position: relative; z-index: 999999" padless>
        <v-row align="center"
               justify="center" style="margin-left: 100px">
            <v-col style="color: white" class="py-4" cols="3">
                <img
                        src="https://www.topcv.vn/v3/images/topcv-logo-4.png?v=1.0.1"
                        alt="TopCV tuyen dung tai TopCV"
                        title="TopCV tuyển dụng tại TopCV"
                        class=""
                        style="height: 50px"
                />
            </v-col>
            <v-col style="color: white; text-align: left" class="py-4" cols="3">
                <p>Việc Làm Phù Hợp Với Bạn</p>
                <p>Quy Định Bảo Mật</p>
                <p>Thỏa Thuận Sử Dụng</p>
                <p>Chính Sách BV Thông Tin Cá Nhân</p>
            </v-col>
            <v-col style="color: white; text-align: left" class="py-4" cols="3">
                <p style="display: flex"> <img style="width: 20px;height: 20px; margin-right: 10px"
                        src="https://cdn-icons.flaticon.com/png/512/2504/premium/2504903.png?token=exp=1646127418~hmac=2c2124ea54c5cb1e5d9f5b96ad2b6cdf"
                        alt="">Facebook</p>

                <p style="display: flex"> <img style="width: 20px;height: 20px; margin-right: 10px"
                                               src="https://cdn-icons.flaticon.com/png/512/3536/premium/3536505.png?token=exp=1646127545~hmac=afd7e8031f99acee6fbd2b92f982c635"
                                               alt="">Linkedin</p>

                <p style="display: flex"> <img style="width: 20px;height: 20px; margin-right: 10px"
                                               src="https://cdn-icons-png.flaticon.com/512/174/174883.png"
                                               alt="">Youtube</p>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script>
    import Logo from "./logo";

    export default {
        name: "footer",
        props: {
            light: {
                type: Boolean,
                default: false,
            },
        },
        components: {Logo},

        data() {
            return {
                links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
            };
        },
    };
</script>
<style lang="scss" scoped>
    .e-footer {
        min-height: 500px;
        display: flex;
        justify-content: center;
        align-content: stretch;
        flex-direction: column;

        &.phone {
            min-height: 400px;
        }

        .footer-watermark {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #00b14f;
            line-height: 1.6rem;
            width: 100%;
            padding: 2rem 0;
        }

        .row-container {
            line-height: 1.9rem;
        }
    }
</style>