<template>
  <div class="home">
    <div class="previews">
      <draggable
        v-model="myArray"
        group="people"
        @start="drag = true"
        @end="drag = false"
      >
        <div class="preview">
          <router-link v-bind:to="'/resume/material-dark'">
            <div class="preview-wrapper">
              <img src="../assets/preview/resume-material-dark.png" />
              <span>material-dark</span>
            </div>
          </router-link>
        </div>
      </draggable>
      <draggable
        v-model="myArray"
        group="people"
        @start="drag = true"
        @end="drag = false"
      >
        <div class="preview">
          <router-link v-bind:to="'/resume/material-dark-projects'">
            <div class="preview-wrapper">
              <img src="../assets/preview/resume-material-dark-projects.png" />
              <span>material-dark-projects</span>
            </div>
          </router-link>
        </div>
      </draggable>
      <div class="preview">
        <router-link v-bind:to="'/resume/left-right'">
          <div class="preview-wrapper">
            <img src="../assets/preview/resume-left-right.png" />
            <span>left-right</span>
          </div>
        </router-link>
      </div>
      <div class="preview">
        <router-link v-bind:to="'/resume/left-right-projects'">
          <div class="preview-wrapper">
            <img src="../assets/preview/resume-left-right-projects.png" />
            <span>left-right-projects</span>
          </div>
        </router-link>
      </div>
      <div class="preview">
        <router-link v-bind:to="'/resume/left-right-rtl'">
          <div class="preview-wrapper">
            <img src="../assets/preview/resume-left-right-rtl.png" />
            <span>left-right-rtl</span>
          </div>
        </router-link>
      </div>
      <div class="preview">
        <router-link v-bind:to="'/resume/oblique'">
          <div class="preview-wrapper">
            <img src="../assets/preview/resume-oblique.png" />
            <span>oblique</span>
          </div>
        </router-link>
      </div>
      <div class="preview">
        <router-link v-bind:to="'/resume/oblique-projects'">
          <div class="preview-wrapper">
            <img src="../assets/preview/resume-oblique-projects.png" />
            <span>oblique-projects</span>
          </div>
        </router-link>
      </div>
      <div class="preview">
        <router-link v-bind:to="'/resume/oblique-rtl'">
          <div class="preview-wrapper">
            <img src="../assets/preview/resume-oblique-rtl.png" />
            <span>oblique-rtl</span>
          </div>
        </router-link>
      </div>
      <div class="preview">
        <router-link v-bind:to="'/resume/side-bar'">
          <div class="preview-wrapper">
            <img src="../assets/preview/resume-side-bar.png" />
            <span>side-bar</span>
          </div>
        </router-link>
      </div>
      <div class="preview">
        <router-link v-bind:to="'/resume/side-bar-projects'">
          <div class="preview-wrapper">
            <img src="../assets/preview/resume-side-bar-projects.png" />
            <span>side-bar-projects</span>
          </div>
        </router-link>
      </div>
      <div class="preview">
        <router-link v-bind:to="'/resume/side-bar-rtl'">
          <div class="preview-wrapper">
            <img src="../assets/preview/resume-side-bar-rtl.png" />
            <span>side-bar-rtl</span>
          </div>
        </router-link>
      </div>
      <div class="preview">
        <router-link v-bind:to="'/resume/purple'">
          <div class="preview-wrapper">
            <img src="../assets/preview/resume-purple.png" />
            <span>purple</span>
          </div>
        </router-link>
      </div>
      <div class="preview">
        <router-link v-bind:to="'/resume/creative'">
          <div class="preview-wrapper">
            <img src="../assets/preview/resume-creative.png" />
            <span>creative</span>
          </div>
        </router-link>
      </div>
      <div class="preview">
        <router-link v-bind:to="'/resume/cool'">
          <div class="preview-wrapper">
            <img src="../assets/preview/resume-cool.png" />
            <span>cool</span>
          </div>
        </router-link>
      </div>
      <div class="preview">
        <router-link v-bind:to="'/resume/cool-rtl'">
          <div class="preview-wrapper">
            <img src="../assets/preview/resume-cool-rtl.png" />
            <span>cool-rtl</span>
          </div>
        </router-link>
      </div>
      <div class="preview">
        <router-link v-bind:to="'/resume/cool-rtl2'">
          <div class="preview-wrapper">
            <img src="../assets/preview/resume-cool-rtl2.png" />
            <span>cool-rtl2</span>
          </div>
        </router-link>
      </div>
      <draggable
        v-model="myArray"
        group="people"
        @start="drag = true"
        @end="drag = false"
      >
        <div class="preview">
          <router-link v-bind:to="'/resume/green'">
            <div class="preview-wrapper">
              <img src="../assets/preview/resume-green.png" />
              <span>green</span>
            </div>
          </router-link>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "resume-template",
  components: {
    draggable,
  },
};
</script>

<style scoped>
.home {
  font-family: "Roboto" !important;
}

.logo {
  text-align: center;
}

.logo img {
  height: 50px;
  margin-top: 40px;
}

.title {
  font-weight: normal;
  text-align: center;
  width: 100%;
  color: black;
  font-weight: 300;
  font-size: 30px;
  line-height: 110%;
  margin: 1.78rem 0 1.424rem 0;
  margin-top: 0px;
  margin-bottom: 40px;
}

.previews {
  width: 90%;
  margin-right: auto;
  margin-left: auto;
}

.preview {
  width: 180px;
  float: left;
  margin-left: 1.5%;
  margin-right: 1.5%;
  margin-bottom: 1.5%;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  height: 252px;
  overflow: hidden;
}

.preview-wrapper {
  position: relative;
  background: white;
}

.preview img {
  width: 100%;
  opacity: 0.5;
  filter: blur(1px);
}

.preview span {
  position: absolute;
  max-width: 100%;
  font-size: 24px;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.75);
  width: 100%;
  text-align: center;
  display: inline-block;
  top: 50%;
  transform: translateY(-50%);
}
</style>
