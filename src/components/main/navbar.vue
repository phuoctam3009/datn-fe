<template>
  <v-app-bar max-height="64px" style="z-index: 1000; position: fixed">
    <div class="navbar-header">
      <router-link to="/">
        <img
          src="../../assets/logo/logo.png"
          alt="MyJob tuyển dụng"
          title="MyJob tuyển dụng"
          class=""
          style="height: 50px"
          @click="toIndexPage"
        />
      </router-link>
    </div>
    <ul class="nav navbar-nav navbar-left">
      <li v-for="menu in menus" :key="menu.name">
        <router-link :to="menu.path" style="text-decoration: none">
          {{ menu.name }}
        </router-link>
      </li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <v-row>
          <li class="nav-item">
            <router-link to="/login" style="text-decoration: none">
              <v-btn style="background: #29aafe; color: white" depressed
                >Đăng nhập
              </v-btn>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" style="text-decoration: none">
              <v-btn color="green" dark>Đăng ký</v-btn>
            </router-link>
          </li>
        </v-row>
      </div>
      <div v-if="currentUser" class="navbar-nav mr-8">
        <!-- <v-menu top :close-on-click="closeOnClick" offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    Xin chào, {{ currentUser.username }}
                    <v-icon v-bind="attrs" v-on="on" small>mdi-arrow-down</v-icon>
                  </template>

                  <v-list>
                    <v-list-item>
                      <router-link to="/profile" style="text-decoration: none">
                        Thông tin cá nhân
                      </router-link>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        <a
                          class="nav-link"
                          href
                          @click.prevent="logOut"
                          style="text-decoration: none"
                        >
                          Đăng xuất
                        </a></v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu> -->
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon dark v-on="on">
              <v-icon style="color: green">account_circle</v-icon>
            </v-btn>
            <!-- <v-btn color="primary" dark v-on="on">Dropdown</v-btn> -->
          </template>
          <v-list>
            <v-list-item @click="toProfile">
              <v-icon left color="primary">lock</v-icon>
              <v-list-item-title>Thông tin cá nhân</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logOut">
              <v-icon left="primary">settings_power</v-icon>
              <v-list-item-title>Đăng xuất</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- <li class="nav-item">
                    <router-link to="/profile" style="text-decoration: none">
                      <font-awesome-icon icon="user" />
                      {{ currentUser.username }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href @click.prevent="logOut">
                      <font-awesome-icon icon="sign-out-alt" /> Đăng xuất
                    </a>
                  </li> -->
      </div>
    </ul>
  </v-app-bar>
</template>

<script>
import Logo from "./logo";

import GlobalComputed from "@/helpers/global-computed";
import GlobalMethods from "@/helpers/global-methods";
import links from "@/helpers/links";
import menus from "@/helpers/menu";

export default {
  name: "navbar",
  components: { Logo },
  props: {
    lightTheme: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sideItems: [
        {
          title: "Thông tin cá nhân",
          icon: "lock",
          link: "/candidate",
        },
        {
          title: "Đăng xuất",
          icon: "settings_power",
          link: "",
        },
      ],
      scrolled: false,
      links,
      menus,
      items: [...Array(4)].map((_, i) => `Item ${i}`),
    };
  },
  computed: {
    light() {
      return this.lightTheme && this.scrolled;
    },
    activeSection() {
      return this.$store.state.activeSection;
    },
    currentUser() {
      console.log("auth", this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
    ...GlobalComputed,
  },
  methods: {
    toProfile() {
      console.log(this.$store.state.auth);
      if (!this.$store.state.auth.status.loggedIn) {
        this.$router.push("/login");
      } else {
        const curUser = this.$store.state.auth.user;
        const isRoleAdmin = (element) => element == "ROLE_ADMIN";
        const isRoleEmployer = (element) => element == "ROLE_EMPLOYEE";
        if (curUser.roles.findIndex(isRoleAdmin) > -1) {
          this.$router.push("/admin");
        } else if (curUser.roles.findIndex(isRoleEmployer) > -1) {
          this.$router.push("/employer");
        } else {
          this.$router.push("/candidate");
        }
      }
    },
    handleScroll() {
      this.scrolled = window.scrollY > 0;
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
    toIndexPage() {
      this.$router.push("/");
    },

    ...GlobalMethods,
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  },
};
</script>

<style lang="scss">
.v-application .navbar {
  &,
  .v-toolbar__content {
    transition: height 0.2s ease-out, background-color 0.1s linear !important;
  }

  &.soft-shadow {
    box-shadow: 0 0 transparent, 0 0 transparent,
      0 5px 5px -4px rgba(0, 0, 0, 0.1) !important;
  }

  &.dark-gradient {
    box-shadow: 0 1px 8px 0px rgba(0, 0, 0, 0.2) !important;
  }

  &.blank {
    &,
    .v-toolbar__content {
      background: none !important;
      border: none !important;
      box-shadow: none !important;
    }
  }

  .v-btn {
    font-weight: normal !important;
    text-transform: capitalize;
    letter-spacing: 1.1px;
    margin: 0 20px;
    border-style: none;
  }
}

.navbar-left {
  display: flex;
  flex-direction: row;
  min-width: 500px;

  li {
    list-style: none;
    margin-right: 30px;
  }
}

.navbar-right {
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 0;

  li {
    list-style: none;
    text-decoration: none;
    margin-right: 30px;
  }
}

.v-app-bar {
  position: fixed;
}
</style>