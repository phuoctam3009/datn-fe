<template>
  <v-app id="keep">
    <v-app-bar
      src="https://images.unsplash.com/photo-1586272778445-ccec18ea579c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=500&q=60"
      fade-img-on-scroll
      app
      clipped-left
      color="primary"
      elevation="7"
      height="75"
    >
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        color="white"
      ></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5 white--text">
        <router-link
          to="/dashboard"
          class="white--text text-uppercase hidden-xs-only"
          style="text-decoration: none"
          >Admin</router-link
        >&nbsp;
        <!-- <span class="font-weight-light">Keep</span> -->
      </span>
      <v-spacer></v-spacer>
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon dark v-on="on">
              <v-icon>account_circle</v-icon>
            </v-btn>
            <!-- <v-btn color="primary" dark v-on="on">Dropdown</v-btn> -->
          </template>
          <v-list>
            <v-list-item
              v-for="item in sideItems"
              :key="item.name"
              router
              :to="item.link"
            >
              <v-icon left color="primary">{{ item.icon }}</v-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <!-- <v-spacer></v-spacer> -->
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color="grey lighten-4"
      elevation="11"
    >
      <v-list text>
        <v-subheader class="primary" color="white--text" elevation="7">
          <v-icon color="primary" class="white" right>dashboard</v-icon>
          <span class="white--text pt-1 pb-1 pr-2 pl-2">DASHBOARD</span>
        </v-subheader>
        <v-list-item-group v-model="item" color="primary">
          <v-list-item
            v-for="item in items"
            :key="item.title"
            router
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <div class="main">
      <vue-page-transition name="fade-in-right">
        <router-view></router-view>
      </vue-page-transition>
    </div>

    <v-footer app dark padless elevation="7">
      <v-card class="flex pt-3 pb-3" flat tile color="primary">
        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} —
          <strong>
            Vuetify Dashboard.
            <span class="white--text">
              Designed With
              <v-icon color="white">favorite</v-icon>&nbsp; By
              <a
                class="white--text"
                target="_blank"
                href="https://gaiyaobed.com.ng"
                >TAMNP</a
              >
            </span>
          </strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    item: 1,
    items: [
      {
        title: "Quản lý nhà tuyển dụng",
        icon: "perm_identity",
        link: "/admin/company",
      },
      {
        title: "Quản lý tin tuyển dụng",
        icon: "reorder",
        link: "/admin/recruitment",
      },
      { title: "Quản lý ứng viên", icon: "mdi-flag", link: "/admin/candidate" },
      { title: "Quản lý user", icon: "mdi-flag", link: "/admin/user" },
    ],
    sideItems: [
      {
        title: "Thông tin cá nhân",
        icon: "lock",
        link: "/profile",
      },
      {
        title: "Đăng xuất",
        icon: "settings_power",
        link: "",
      },
    ],
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    BreadItems: [
      {
        text: "Dashboard",
        disabled: false,
        href: "/dashboard",
      },
      {
        text: "Link 1",
        disabled: false,
        href: "breadcrumbs_link_1",
      },
      {
        text: "Link 2",
        disabled: true,
        href: "breadcrumbs_link_2",
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
#keep .v-navigation-drawer__border {
  display: none;
}

input::label {
  color: red !important;
  opacity: 1;
}
#search {
  color: black;
}
.main {
  padding: 0px 20px;
  margin-top: -20px;
}
</style>
