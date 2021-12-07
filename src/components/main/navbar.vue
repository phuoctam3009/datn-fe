<template>
  <v-app-bar
    :light="light"
    :height="scrolled ? this.navbarHeight : pcOnly ? 130 : 100"
    class="navbar"
    :class="{
      blank: !scrolled & !light,
      'soft-shadow': light,
      'dark-gradient': scrolled && !light,
    }"
    :flat="!light"
    fixed
    :color="light ? 'white' : 'dark'"
    :dark="!light"
  >
    <v-container class="d-flex align-center">
      <div>
        <!-- logo -->
        <logo :light="light" :width="pcOnly ? 140 : 125" />
      </div>
      <v-spacer />
      <v-slide-x-reverse-transition appear>
        <div class="d-flex">
          <!-- <div class="d-flex align-center" v-for="(item, i) in menus" :key="i">
            <v-btn class="ms-2" :outlined="true">
              {{ item.name }}
            </v-btn>
          </div>

          <div class="d-flex align-center ms-8">
            <locale-button :large="pcOnly" />
          </div> -->
          <v-row justify="space-around">
            <v-menu v-for="(text, index) in btns" :key="text" offset-y>
              <template v-slot:activator="{ attrs, on }">
                <v-btn class="white--text ma-5" v-bind="attrs" v-on="on">
                  {{ text }}
                </v-btn>
              </template>

              <v-list>
                <v-list-item v-for="item in items[index]" :key="item" link>
                  <v-list-item-title v-text="item"></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-row>
          <div class="d-flex align-center ms-8">
            <locale-button :large="pcOnly" />
          </div>
        </div>
      </v-slide-x-reverse-transition>
    </v-container>
  </v-app-bar>
</template>

<script>
import LocaleButton from "../custom/locale-button";
import Logo from "./logo";

import GlobalComputed from "@/helpers/global-computed";
import GlobalMethods from "@/helpers/global-methods";
import links from "@/helpers/links";
import menus from "@/helpers/menu";

export default {
  name: "navbar",
  components: { Logo, LocaleButton },
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
      btns: ["Home", "Position", "Resume", "Company", "Pages"],
      colors: ["deep-purple accent-4", "error", "teal darken-1"],
      items: [
        ["test", "test5"],
        ["test", "test4"],
        ["test", "test3"],
        ["test", "test2"],
        ["test", "test1"],
      ],
    };
  },
  computed: {
    light() {
      return this.lightTheme && this.scrolled;
    },
    activeSection() {
      return this.$store.state.activeSection;
    },
    ...GlobalComputed,
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 0;
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
</style>