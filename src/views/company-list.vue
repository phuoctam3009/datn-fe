<template>
    <div class="main">
        <v-card class="card-filter">
            <v-container class="is-search">
                <v-row>
                    <v-col cols="12" md="12">
                        <v-text-field
                                outlined
                                label="Tìm kiếm ..."
                                dense
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
        <v-card>
            <v-container class="is-data-job">
                <div class="is-title">
                    <span>Danh sách nhà tuyển dụng</span>
                    <div class="is-line">
                    </div>
                </div>
                <v-row class="is-data-employ-row">
                    <v-col v-for="(item, i) in listCompany" :key="i" cols="4" hover class="is-data-employ">
                        <div class="is-item-data">
                            <div class="box-company item-hover">
                                <div class="company-banner">
                                    <div class="p-employer">
                                        <router-link :to="{ name: 'CompanyDetail',params: { companyId: item.id },}">
                                            <div class="cover-wraper p-employer__img1">
                                                <img :src="item.background" alt="Công ty TNHH CMC GLOBAL"
                                                     class="img-fluid"/>
                                            </div>
                                        </router-link>
                                        <div class="company-logo p-employer__img2">
                                            <router-link :to="{name: 'CompanyDetail',params: { companyId: item.id }, }">
                                                <img class="img-fluid" :src="item.avatar"
                                                     alt="Công ty TNHH CMC GLOBAL"/>
                                            </router-link>
                                        </div>

                                        <h3 class="p-employer__title">
                                            <router-link :to="{name: 'CompanyDetail',params: { companyId: item.id },}"
                                                         style="text-decoration: none"
                                            ><span class="com-name">{{ item.companyName }}</span>
                                            </router-link>
                                        </h3>

                                    </div>
                                </div>
                                <div class="company-info">

                                    <div class="company-description">
                                        <p>"{{ item.description }}"</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
            <div class="text-center" style="padding: 20px 0 30px 0">
                <v-pagination
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
    import {getAllCompany} from "../api/company/company";

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

    .is-search {
        padding-top: 30px;
    }

    .is-data-job {
        padding: 0 30px;
    }

    .is-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 -15px 30px;
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

    .is-data-employ {

    }

    .is-item-data {
        padding: 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
        height: 400px;
    }

    .is-data-employ-row {
    }

    .p-employer {
        position: relative;

        &__img1 {
            img {
                width: 100%;
                height: 200px;
                object-fit: cover;
                box-shadow: 0 4px 2px -2px rgba(99, 99, 99, 0.2);
            }
        }

        &__img2 {
            position: absolute;
            width: 100px;
            height: 100px;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            bottom: -50px;
            left: 10px;
        }

        &__title {
            position: absolute;
            left: 120px;
            bottom: 0;
            transform: translateY(100%);
            display: -webkit-box;
            max-width: 200px;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;

        }
    }

    .company-banner {
        height: 265px;
    }

    .company-description {
        padding: 0 10px;
    }
</style>