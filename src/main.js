import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";

import globalComponents from "./globalComponents";
import { LoadingPlugin } from "vue-loading-overlay";
import { createPinia } from "pinia";
import { createVfm } from "vue-final-modal";
import ToastPlugin from "vue-toast-notification";

import "./style.css";

import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "vue-loading-overlay/dist/css/index.css";
import "vue-final-modal/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "vue-toast-notification/dist/theme-bootstrap.css";
import { globalVariable } from "./globalVariable";

const app = createApp(App);
const pinia = createPinia();
const vfm = createVfm();

// Add global variable
app.config.globalProperties.$global = globalVariable;


app.use(vfm);
app.use(ToastPlugin);
app.use(router);
app.use(pinia);
app.use(LoadingPlugin);
app.use(globalComponents);
app.mount("#app");
