<template>
  <ul class="tree-view">
    <TreeItem
      v-for="item in listData"
      :item="item"
      :key="item._id"
      :component-id="taskItem"
    >
    </TreeItem>
  </ul>
</template>

<script lang="ts">
import TreeItem from "@/components/grid/TreeItem.vue";
import { useTaskStore } from "@/store/business/taskStore";
import commonFn from "@/utilities/commonFn";
import { defineAsyncComponent, defineComponent, onMounted, PropType, ref } from "vue";

export default defineComponent({
  name: "TaskTree",
  components: {
    TreeItem,
  },
  props: {
    items: {
      type: Array as PropType<any[]>,
      default: [],
    },
  },
  setup() {
    const store = useTaskStore();
    const listData: any = ref([]);
    const taskItem = defineAsyncComponent(
      () => import("@/pages/admin/task/views/tree/TaskItem.vue")
    );
    onMounted(async () => {
      const res = await store.load();
      if (Array.isArray(res)) {
        listData.value = commonFn.convertFlatListDataToListTree(res);
      }
    });

    return { listData, taskItem };
  },
});
</script>

<style lang="scss" scoped></style>
