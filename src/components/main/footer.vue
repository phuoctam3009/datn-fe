<template>
  <v-footer color="primary lighten-1" padless>
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
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
  components: { Logo },

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
    background-color: rgba(0, 0, 0, 0.3);
    line-height: 1.6rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 2rem 0;
  }
  .row-container {
    line-height: 1.9rem;
  }
}
</style>