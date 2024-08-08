import { computed, PropType, reactive } from "vue";
import { useTagStore } from "../../store/dictionary/tagStore";
import IColumnConfig from "@/interfaces/gridView/IColumnConfig";

export const useCacheTagCombo = () => {
  const store = useTagStore();

  const data = computed(() => {
    return store.data;
  });

  const configDefault = {
    columns: [{ dataField: "name", title: "Name" }] as Array<IColumnConfig>,
    key: "_id",
    displayField: "name",
  };

  const cacheTagCombo = reactive({
    data: data.value as Array<any>,
    ...configDefault,
  });

  return {
    cacheTagCombo,
  };
};
