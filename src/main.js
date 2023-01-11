import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// Javascript Sweet Alert
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
//
// import LearnVueButtons from "lv-buttons";
// import "lv-buttons/dist/style.css";
createApp(App)
  .use(store)
  .use(VueSweetalert2)
  // .use(LearnVueButtons)
  .use(router)
  .mount("#app");
