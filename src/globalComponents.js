// src/globalComponents.js
import Card from "@/components/card/Card.vue";
import Chip from "./components/chip/Chip.vue";

export default {
  install(app) {
    app.component("Card", Card);
    app.component("Chip", Chip);
  },
};
