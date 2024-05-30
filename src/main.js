import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import router from "./router";
import globalComponents from "./globalComponents";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const app = createApp(App);
app.use(router);
app.use(LoadingPlugin);
app.use(globalComponents);
app.mount("#app");
