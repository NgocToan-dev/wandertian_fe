// src/globalComponents.js
import Card from "@/components/card/Card.vue";
import Chip from "./components/chip/Chip.vue";
import { QuillEditor } from "@vueup/vue-quill";
import Combobox from "@/components/combobox/Combobox.vue";
import DynamicModal from "@/components/modal/DynamicModal.vue";

export default {
  install(app) {
    app.component("Card", Card);
    app.component("Chip", Chip);
    app.component("QuillEditor", QuillEditor);
    app.component("Combobox", Combobox);
    app.component("DynamicModal", DynamicModal);
  },
};
