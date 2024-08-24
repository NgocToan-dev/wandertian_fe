<template>
  <div class="d-flex justify-content-start align-items-baseline">
    <div
      v-for="column in columns"
      :key="column.title"
      class="bg-gray-100 rounded-lg px-3 py-3 column-width rounded mr-4"
    >
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">
        {{ column.title }}
      </p>
      <!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
      <draggable
        v-model="column.tasks"
        :animation="200"
        ghost-class="ghost-card"
        group="tasks"
        item-key="title"
        @end="onDropEvent"
      >
        <template #item="{ element }">
          <task-card
            :key="element.id"
            :task="element"
            class="mt-3 cursor-move"
          ></task-card>
        </template>
      </draggable>
    </div>
  </div>
</template>
<script lang="ts">
import draggable from "vuedraggable";
import TaskCard from "./TaskCard.vue";
import { PropType } from "vue";
export default {
  props: {
    columns: {
      type: Array as PropType<Array<any>>,
      required: true,
    },
    groupType: {
      type: String,
      default: "enum",
    },
    enumType: {
      type: String,
      default: "",
    },
  },

  components: {
    draggable,
    TaskCard,
  },

  methods: {
    onDropEvent(evt: any) {
      this.columns.forEach((column: any) => {
        column.tasks.forEach((task: any) => {
          task.status = column.groupValue;
        });
      });
    },
  },
};
</script>

<style lang="scss">
.column-width {
  min-width: 320px;
  width: 320px;
}
/* Unfortunately @apply cannot be setup in codesandbox, 
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
.ghost-card {
  opacity: 0.5;
  background: #f7fafc;
  border: 1px solid #4299e1;
}
</style>
