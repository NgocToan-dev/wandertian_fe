// src/globalComponents.js
import Card from "@/components/card/Card.vue";
import Chip from "./components/chip/Chip.vue";
import { QuillEditor } from "@vueup/vue-quill";

export default {
  install(app) {
    app.component("Card", Card);
    app.component("Chip", Chip);
    app.component("QuillEditor", QuillEditor);
  },
};
