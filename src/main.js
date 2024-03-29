import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./registerServiceWorker";
import i18n from './i18n'
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueSweetalert2 from 'vue-sweetalert2';
import VueHtml2pdf from 'vue-html2pdf'
import _ from 'lodash';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
// import AvatarCropper from 'vue-avatar-cropper'


// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import Cloudinary from 'cloudinary-vue';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);
Vue.use(Cloudinary, {
  configuration: {
    cloudName: "degh5xw5d"
  }
});
Vue.config.productionTip = false;
Vue.use(VeeValidate);
Vue.use(VueSweetalert2);
Vue.use(VueHtml2pdf);
Vue.use(VueCropper);
// Vue.use(AvatarCropper)
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
