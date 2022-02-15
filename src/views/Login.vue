<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs8 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="success">
                                <v-toolbar-title>Đăng nhập</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form
                                        ref="form"
                                        v-model="loading"
                                        lazy-validation
                                        @submit.prevent="validate"
                                >
                                    <v-text-field
                                            v-model="user.username"
                                            prepend-icon="person"
                                            name="login"
                                            label="Tên đăng nhập"
                                            :rules="nameRules"
                                            type="text"
                                            required
                                            outlined
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="user.password"
                                            prepend-icon="lock"
                                            name="password"
                                            label="Mật khẩu"
                                            :rules="passwordRules"
                                            type="password"
                                            required
                                            outlined
                                    ></v-text-field>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                                color="success"
                                                @click="handleLogin"
                                                :disabled="!loading"
                                                block
                                                large
                                        >Đăng nhập
                                        </v-btn
                                        >
                                    </v-card-actions>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import User from "../models/user";

    export default {
        name: "Login",
        data: () => ({
            loading: true,
            user: new User("", ""),
            nameRules: [
                (v) => !!v || "Tên đăng nhập là bắt buộc",
                (v) => (v && v.length > 4) || "Tên đăng nhập phải lớn hơn 4 ký tự",
            ],
            passwordRules: [
                (v) => !!v || "Mật khẩu là bắt buộc",
                (v) => (v && v.length >= 6) || "Mật khẩu phải lớn hơn hoặc bằng 6 ký tự",
            ],
        }),
        props: {
            source: String,
        },
        methods: {
            validate() {
            },
            handleLogin() {
                this.loading = false;
                if (
                    this.$refs.form.validate() &&
                    this.user.username &&
                    this.user.password
                ) {
                    this.$store.dispatch("auth/login", this.user).then(
                        () => {
                            this.$swal("Thành công", "Đăng ký thành công", "success").then(
                                () => {
                                    this.$router.push("/");
                                }
                            );
                        },
                        (error) => {
                            this.loading = true;
                            this.$swal("Thất bại", "Đăng nhập thất bại", "error");
                        }
                    );
                }
                // this.$validator.validateAll().then((isValid) => {
                //   if (this.user.username && this.user.password) {
                //     this.$store.dispatch("auth/login", this.user).then(
                //       () => {
                //         this.$router.push("/profile");
                //       },
                //       (error) => {
                //         this.loading = false;
                //         this.message =
                //           (error.response &&
                //             error.response.data &&
                //             error.response.data.message) ||
                //           error.message ||
                //           error.toString();
                //       }
                //     );
                //   }
                // });
            },
        },
    };
</script>

<style scoped>
    .v-card__actions {
        padding: unset;
    }
    .v-main {
        background-image: url("https://images.unsplash.com/photo-1532688062201-dea3c56514b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80");
        background-size: cover;
    }
</style>
