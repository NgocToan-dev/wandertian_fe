// src/globalComponents.js
import Card from "@/components/card/Card.vue";
import Chip from "@/components/chip/Chip.vue";
import RichEditor from "@/components/richEditor/RichEditor.vue";
import Combobox from "@/components/combobox/Combobox.vue";
import DynamicModal from "@/components/modal/DynamicModal.vue";
import BaseInput from "./components/input/BaseInput.vue";

export default {
  install(app) {
    app.component("Card", Card);
    app.component("Chip", Chip);
    app.component("RichEditor", RichEditor);
    app.component("Combobox", Combobox);
    app.component("DynamicModal", DynamicModal);
    app.component("BaseInput", BaseInput);
  },
};
