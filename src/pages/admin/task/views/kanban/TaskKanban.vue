<template>
  <KanbanView :columns="items" enumType="TaskStatus" />
</template>
<script lang="ts">
import { useTaskStore } from "@/store/business/taskStore";
import baseList from "@/pages/base/baseList";
import KanbanView from "@/components/kanbanView/KanbanView.vue";
import { getCurrentInstance, onMounted, Ref, ref } from "vue";
import { get } from "http";
import commonFn from "@/utilities/commonFn";
export default {
  components: {
    KanbanView,
  },
  setup() {
    const { proxy } = getCurrentInstance() as any;
    const store = useTaskStore();
    const items: Ref<Array<any>> = ref([]);

    onMounted(async () => {
      const res = await store.load();
      items.value = commonFn.convertTableToKanban(res, "enum", "TaskStatus");
    });
    return { items };
  },
};
</script>

<style lang="scss"></style>
