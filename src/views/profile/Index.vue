<template>
  <v-app id="keep">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color="grey lighten-4"
      elevation="11"
      style="margin-top: 64px"
    >
      <v-list text>
        <v-subheader class="primary" color="white--text" elevation="7">
          <v-icon color="primary" class="white" right>dashboard</v-icon>
          <span class="white--text pt-1 pb-1 pr-2 pl-2">Thông tin</span>
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
import menu from "@/helpers/navigate";

export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    item: 1,
    items: [
      {
        title: "Thông tin cá nhân",
        icon: "perm_identity",
        link: "/admin/company",
      },
      {
        title: "Công việc ứng tuyển",
        icon: "reorder",
        link: "/admin/recruitment",
      },
      { title: "Quản lý CV", icon: "mdi-flag", link: "/admin/candidate" },
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
  created() {
    this.items = menu[this.$route.name];
  },
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
.v-navigation-drawer {
  z-index: 1!important;


  &__content {
    margin-top: 64px;
  }
}

</style>
