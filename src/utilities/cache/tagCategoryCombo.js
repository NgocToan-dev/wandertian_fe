import { computed, reactive } from "vue";
import { useTagStore } from "../../store/dictionary/categoryStore";

export const useCacheTagCombo = () => {
  const store = useTagStore();

  const data = computed(() => {
    return store.data;
  });

  const configDefault = {
    columns: [
      { dataField: "tag_name", label: "Name" },
    ],
    key: "_id",
    displayField: "tag_name",
  };

  const cacheTagCombo = reactive({
    data: data.value,
    ...configDefault,
  });

  return {
    cacheTagCombo,
  };
};
