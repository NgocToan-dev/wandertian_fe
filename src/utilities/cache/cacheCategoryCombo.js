import { computed, reactive } from "vue";
import { useCategoryStore } from "../../store/dictionary/categoryStore";

export const useCacheCategoryCombo = () => {
  const store = useCategoryStore();

  const data = computed(() => {
    return store.data;
  });

  const configDefault = {
    columns: [
      { dataField: "name", label: "Name" },
      // Add more columns here
    ],
    key: "_id",
    displayField: "name",
  };

  const cacheCategoryCombo = reactive({
    data: data.value,
    ...configDefault,
  });

  return {
    cacheCategoryCombo,
  };
};
