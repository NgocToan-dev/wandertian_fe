<template>
  <div class="calendar-view">
    <vue-cal
      class="vuecal--blue-theme"
      :events="dailyRoutine"
      today-button
      :disable-views="['years', 'year']"
      :on-event-click="onEventClick"
    >
    </vue-cal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import modalRegister from "@/utilities/modalRegister";

const dailyRoutine = ref([
  {
    start: "2024-8-6 14:00",
    end: "2024-8-6 18:00",
    title: "Need to go shopping",
    icon: "shopping_cart", // Custom attribute.
    content: "Click to see my shopping list",
    contentFull:
      "My shopping list is rather long:<br><ul><li>Avocados</li><li>Tomatoes</li><li>Potatoes</li><li>Mangoes</li></ul>", // Custom attribute.
    class: "leisure",
  },
  {
    start: "2024-8-7 10:00",
    end: "2024-8-7 15:00",
    title: "Golf with John",
    icon: "golf_course", // Custom attribute.
    content: "Do I need to tell how many holes?",
    contentFull: "Okay.<br>It will be a 18 hole golf course.", // Custom attribute.
    class: "sport",
  },
]);

const onEventClick = (event) => {
  modalRegister.openModal("EventDetail", {
    data: event,
  });
};
</script>

<style lang="scss">
.vuecal__event {
  cursor: pointer;
}

.vuecal__event-title {
  font-size: 1.2em;
  font-weight: bold;
  margin: 4px 0 8px;
}

.vuecal__event-time {
  display: inline-block;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.vuecal__event-content {
  font-style: italic;
}
.calendar-view {
  height: 550px;
}
</style>
