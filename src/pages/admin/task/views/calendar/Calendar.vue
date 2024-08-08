<template>
  <div class="calendar-view">
    <vue-cal
      class="vuecal--blue-theme"
      :events="events"
      today-button
      :disable-views="['years', 'year']"
      :on-event-dblclick="onEventClick"
    >
    </vue-cal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import VueCal from "vue-cal";

import modalRegister from "@/utilities/modalRegister";
import IEventCalEntity from "@/interfaces/entity/IEventCalEntity";
import IEventEntity from "@/interfaces/entity/IEventEntity";
import Enum from "@/utilities/enum/Enum";
import EditMode from "@/utilities/enum/EditMode";
import { useTaskStore } from "@/store/business/taskStore";

const taskStore = useTaskStore();

const events: Ref<Array<IEventCalEntity>> = ref([]);
onMounted(async () => {
  let eventRaw: any[] = [];
  if (taskStore.$state.data.length == 0) {
    eventRaw = await taskStore.load();
  }
  events.value = eventRaw.map((event: IEventEntity) => convertEventToEventCal(event));
});
const onEventClick = (event: IEventCalEntity) => {
  const res: IEventEntity = convertEventCalToEvent(event);
  modalRegister.openModal("EventDetail", {
    data: res,
  });
};
const convertEventCalToEvent = (event: IEventCalEntity): IEventEntity => {
  return {
    _id: "",
    title: event.title,
    note: event.contentFull,
    type: Enum.EventType.Task,
    startDate: new Date(event.start),
    endDate: new Date(event.end),
    color: event.class,
    mode: EditMode.EDIT,
  };
};
const convertEventToEventCal = (event: IEventEntity): IEventCalEntity => {
  return {
    start: event.startDate
      ? convertDate(new Date(event.startDate))
      : convertDate(new Date()),
    end: event.endDate ? convertDate(new Date(event.endDate)) : convertDate(new Date()),
    title: event.title,
    icon: "event",
    content: event.note,
    class: "sport",
  };
};
/**
 * Format yyyy-MM-dd HH:mm
 * @param date
 */
const convertDate = (date: Date) => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
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
/* Different color for different event types. */
.vuecal__event.leisure {
  background-color: rgba(253, 156, 66, 0.9);
  border: 1px solid rgb(233, 136, 46);
  color: #fff;
}
.vuecal__event.sport {
  background-color: rgba(255, 102, 102, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
}
.vuecal__event-content {
  font-style: italic;
}
.calendar-view {
  height: 550px;
}
</style>
