import { defineAsyncComponent } from "vue";
// src/globalComponents.js
const Combobox = defineAsyncComponent(
  () => import("@/components/combobox/Combobox.vue")
);
const Card = defineAsyncComponent(() => import("@/components/card/Card.vue"));
const Chip = defineAsyncComponent(() => import("@/components/chip/Chip.vue"));
const RichEditor = defineAsyncComponent(
  () => import("@/components/richEditor/RichEditor.vue")
);
const DynamicModal = defineAsyncComponent(
  () => import("@/components/modal/DynamicModal.vue")
);
const BaseInput = defineAsyncComponent(
  () => import("@/components/input/BaseInput.vue")
);

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
