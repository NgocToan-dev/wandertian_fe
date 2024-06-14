import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";

import globalComponents from "./globalComponents";
import { LoadingPlugin } from "vue-loading-overlay";
import { createPinia } from "pinia";
import { createVfm } from "vue-final-modal";
import ToastPlugin from "vue-toast-notification";

import "./style.scss";

import "vue-loading-overlay/dist/css/index.css";
import "vue-final-modal/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "vue-toast-notification/dist/theme-bootstrap.css";
import { globalVariable } from "./globalVariable";
//Import Froala Editor 
import 'froala-editor/js/plugins.pkgd.min.js';
//Import third party plugins
import 'froala-editor/js/third_party/embedly.min';
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/third_party/image_tui.min';
// Import Froala Editor css files.
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import VueFroala from 'vue-froala-wysiwyg';

const app = createApp(App);
const pinia = createPinia();
const vfm = createVfm();


// Add global variable
app.config.globalProperties.$global = globalVariable;
app.use(VueFroala);
app.use(vfm);
app.use(ToastPlugin);
app.use(router);
app.use(pinia);
app.use(LoadingPlugin);
app.use(globalComponents);
app.mount("#app");
