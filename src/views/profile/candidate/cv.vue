<template>
    <div class="content">
        <div class="is-title">
            <span>Danh sách cv</span>
            <div class="is-line"></div>
        </div>
        <v-row dense>
            <v-col v-for="card in cards" :key="card.title" :cols="3">
                <v-card class="card-cv">
                    <div class="resume-info" @click="previewCV(card.id)">
                        <v-img
                                :src="card.avatar || avatarDefault"
                                class="white--text align-end"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                height="300px"
                        >
                            <v-card-title
                                    v-text="card.title ? card.title : 'Tiêu đề CV'"
                            ></v-card-title>
                        </v-img>
                    </div>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#00b14f" style="color: white; min-width: unset" @click="editCV(card.id)">
                            <v-icon dark>
                                mdi-wrench
                            </v-icon>
                        </v-btn>
                        <v-btn color="error" style="color: white; min-width: unset" @click="removeCV(card.id)">  <v-icon dark>
                            mdi-delete
                        </v-icon></v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col :cols="3">
                <v-card class="button-add-cv">
                    <span>
                        +
                    </span>
                </v-card>
            </v-col>

        </v-row>
    </div>
</template>
<script>
    import {getResumes, deleteResumeById} from "@/api/resume/resume";

    export default {
        data: () => ({
            cards: [],
            avatarDefault: require("../../../../resume/id.jpg"),
        }),
        created() {
            this.getListResumes();
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
        },
        methods: {
            getListResumes() {
                getResumes(this.currentUser.id).then((response) => {
                    if (response.status == 200) {
                        this.cards = response.data;
                    }
                });
            },
            removeCV(resumeId) {
                console.log(resumeId);
                this.$swal
                    .fire({
                        title: "Bạn chắc chắn muốn xóa CV này?",
                        showDenyButton: true,
                        confirmButtonText: "Đồng ý",
                        denyButtonText: `Hủy`,
                    })
                    .then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            // this.$swal.fire("Saved!", "", "success");
                            deleteResumeById(resumeId).then((response) => {
                                this.showToast("success", response.data);
                                this.getListResumes();
                            });
                        } else if (result.isDenied) {
                            this.getListResumes();
                        }
                    });
            },
            editCV(resumeId) {
                this.$router.push(`/resume/material-dark/${resumeId}?q=edit`);
            },
            previewCV(resumeId) {
                console.log(resumeId);
                this.$router.push(`/resume/material-dark/${resumeId}`);
            },
            showToast(status, title) {
                let Toast = this.$swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });

                Toast.fire({
                    icon: status,
                    title: title,
                });
            },
        },
    };
</script>
<style lang="scss" scoped>
    .content {
        // margin-top: 80px;
        margin: 0 50px;
    }

    .card-cv {
        margin: 10px 10px;
    }

    .resume-info:hover {
        cursor: pointer;
    }

    .button-add-cv {
        margin: 10px 10px;
        height: 352px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 100px;
        color: #00b14f;


        span {
            border: 1px dotted #00b14f;
            width: 90%;
            height: 90%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .is-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 30px 10px 30px;
        font-size: 20px;
        color: white;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

        span {
            padding: 2px 5px;
            width: 50%;
            background: #00b14f;
            position: relative;

            &:after {
                content: "";
                position: absolute;
                top: -25px;
                right: -25px;
                width: 50px;
                height: 50px;
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


</style>