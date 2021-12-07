<template>
  <div class="temp">
    <div>
      <p><vns :start="0" :end="1000" :times="20" :speed="50" /></p>
      <h2>Jobs</h2>
    </div>
    <div>
      <p><vns :start="0" :end="1000" :times="20" :speed="50" /></p>
      <h2>Members</h2>
    </div>
    <div>
      <p><vns :start="0" :end="1000" :times="20" :speed="50" /></p>
      <h2>Resume</h2>
    </div>
    <div>
      <p><vns :start="0" :end="1000" :times="20" :speed="50" /></p>
      <h2>Company</h2>
    </div>
  </div>
</template>
<script>
import vns from "vue-number-scroll";
export default {
  components: {
    vns,
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      // Any code to be executed when the window is scrolled
    },
  },
};
</script>
<style>
.temp {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 300px;
}
</style>