<template>
  <div>
    
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      tab: null,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    // if (!this.currentUser) {
    //   this.$router.push("/login");
    // }
  },
};
</script>
<style lang="scss" scoped>
.container {
  margin: auto;
  width: 60%;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
}
.tab-item {
  display: flex;
  justify-content: center;
  height: 82vh;
  .v-card {
    margin-top: 10px;
    width: 50%;
  }
}
.box-title {
  border-left: 7px solid #00b14f;
  color: #333;
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 16px;
  padding-left: 12px;
  text-align: initial;
}
</style>