<template>
  <v-app-bar max-height="64px">
    <div class="navbar-header">
      <router-link to="/">
        <img
          src="https://www.topcv.vn/v3/images/topcv-logo-4.png?v=1.0.1"
          alt="TopCV tuyen dung tai TopCV"
          title="TopCV tuyển dụng tại TopCV"
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
              <v-btn color="primary" depressed>Đăng nhập</v-btn>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" style="text-decoration: none">
              <v-btn color="green">Đăng ký</v-btn>
            </router-link>
          </li>
        </v-row>
      </div>
      <div v-if="currentUser" class="navbar-nav ml-auto">
        <v-row>
          <li class="nav-item">
            <router-link to="/profile" style="text-decoration: none">
              <font-awesome-icon icon="user" />
              {{ currentUser.username }}
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href @click.prevent="logOut">
              <font-awesome-icon icon="sign-out-alt" /> Đăng xuất
            </a>
          </li>
        </v-row>
      </div>
    </ul>
  </v-app-bar>
</template>

<script>
// import LocaleButton from "../custom/locale-button";
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
</style>