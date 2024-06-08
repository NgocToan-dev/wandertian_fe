import { computed, reactive } from "vue";
import { useTagStore } from "../../store/dictionary/tagStore";

export const useCacheTagCombo = () => {
  const store = useTagStore();

  const data = computed(() => {
    return store.data;
  });

  const configDefault = {
    columns: [{ dataField: "name", label: "Name" }],
    key: "_id",
    displayField: "name",
  };

  const cacheTagCombo = reactive({
    data: data.value,
    ...configDefault,
  });

  return {
    cacheTagCombo,
  };
};
