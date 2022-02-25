<template>
  <v-footer style="background: #4ca571; position: relative; z-index: 999999" padless>
    <v-row justify="center" no-gutters>
      <v-col style="color: white" class="py-4 text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>by Nguyen Phuoc Tam</strong>
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