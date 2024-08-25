<template>
  <div class="w-100 form-control">
    <div class="choice d-flex flex-wrap gap-1">
      <Chip
        v-for="item in internalValue"
        :key="item[props.valueField]"
        :text="item[props.displayField]"
        removeIcon
        @remove="removeChoice(item)"
      />
    </div>
    <input
      class="w-100 mt-1"
      type="text"
      :value="internalText"
      @keydown="onKeyDown"
      placeholder="Search..."
      data-bs-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    />
    <div class="dropdown w-100">
      <div
        class="dropdown-menu shadow overflow-hidden border-0 w-100"
        aria-labelledby="dropdownMenuButton"
      >
        <div class="grid" v-if="columns?.every((column) => column.title)">
          <div
            class="col item-header"
            v-for="column in columnsCompt"
            :key="column.valueField"
          >
            <strong>{{ column.title }}</strong>
          </div>
        </div>
        <div
          v-for="(item, index) in filterData"
          class="grid item-body cursor-pointer py-1"
          :class="[{
            active: Array.from(internalValue).some((e: any) => e[valueField] == item[valueField])
          }, { 'active-step': index == activeStep }]"
          :key="item[valueField]"
          @click="chooseValue(item)"
        >
          <div
            class="col d-flex justify-content-start align-items-center gap-2"
            v-for="(column, index) in columnsCompt"
            :key="index"
          >
            <slot name="item-icon" :item="item"></slot>
            {{ item[column.dataField] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IColumnConfig from "@/interfaces/gridView/IColumnConfig";
import commonFn from "@/utilities/commonFn";
import Enum from "@/utilities/enum/Enum";
import { computed, onMounted, PropType, ref, watch } from "vue";

const internalText = ref("");
const internalValue: any = ref([]);
const modelValue: any = defineModel();
const activeStep = ref(-1);

onMounted(() => {
  if (modelValue.value != undefined) {
    if (props.enum) {
      internalValue.value = [
        {
          [props.valueField]: modelValue.value,
          [props.displayField]: commonFn.getEnumValue(props.enum, modelValue.value).value,
        },
      ];
    }
  }
});
const props = defineProps({
  data: Array as PropType<any[]>,
  columns: Array as PropType<Array<IColumnConfig>>,
  valueField: { type: String, default: "" },
  displayField: { type: String, default: "" },
  multiple: {
    type: Boolean,
    default: false,
  },
  enum: {
    type: String,
    default: "",
  },
});
watch(
  () => props.data,
  () => {
    if (Array.isArray(modelValue.value)) {
      const items = props.data?.filter((item) => {
        return modelValue.value.includes(item[props.valueField]);
      });
      if (items) {
        internalValue.value = items.map((item) => {
          return {
            [props.valueField]: item[props.valueField],
            [props.displayField]: item[props.displayField],
          };
        });
      }
    }
  }
);
const emit = defineEmits(["selected", "update:modelValue"]);
const filterData = computed(() => {
  let res: any = [];
  // If enum is provided, get the enum values
  if (props.enum) {
    const items: any = Enum[props.enum as keyof typeof Enum];
    // Return array from items
    res = Object.keys(items).map((key) => {
      return {
        [props.valueField]: items[key],
        [props.displayField]: commonFn.getEnumValue(props.enum, items[key]).value,
      };
    });
  }
  // If data is provided, filter the data
  if (Array.isArray(internalValue.value) && props.data) {
    res = props.data.filter((item) => {
      const itemVal = item[props.valueField as keyof typeof item];
      return !internalValue.value.some(
        (value: any) => value[props.valueField as keyof typeof value] === itemVal
      );
    });
  }

  return res.filter((item: any) => {
    return item[props.displayField].toLowerCase().includes(internalText.value);
  });
});
const columnsCompt = computed(() => {
  if (props.enum) {
    return [
      {
        dataField: props.displayField,
      },
    ];
  } else {
    return props.columns;
  }
});
const chooseValue = (item: any) => {
  //check if the item is already selected, if not, push to the model
  if (
    internalValue.value &&
    !internalValue.value.includes(item[props.valueField as keyof typeof item])
  ) {
    if (props.multiple) {
      internalValue.value.push({
        [props.valueField]: item[props.valueField],
        [props.displayField]: item[props.displayField],
      });
    } else {
      internalValue.value = [
        {
          [props.valueField]: item[props.valueField],
          [props.displayField]: item[props.displayField],
        },
      ];
    }
    internalText.value = "";
    modelValue.value = internalValue.value.map((item: any) => item[props.valueField]);
    emit("selected", item);
  }
};
const removeChoice = (item: any) => {
  internalValue.value = internalValue.value.filter(
    (value: any) => value[props.valueField] !== item[props.valueField]
  );
  modelValue.value = internalValue.value.map((item: any) => item[props.valueField]);
};
const onKeyDown = (e: any) => {
  switch (e.key) {
    case "Enter":
      const item = filterData.value[activeStep.value];
      chooseValue(item);
      break;
    case "ArrowDown":
      // If the dropdown is open, move the focus to the next item
      activeStep.value =
        activeStep.value == filterData.value.length - 1 ? 0 : activeStep.value + 1;
      break;
    case "ArrowUp":
      // If the dropdown is open, move the focus to the previous item
      activeStep.value =
        activeStep.value == 0 ? filterData.value.length - 1 : activeStep.value - 1;
      break;
  }
};
</script>

<style lang="scss" scoped>
:deep(.dropdown-menu) {
  max-height: 200px;
  padding: 0 !important;
  .item-header {
    padding: 10px;
  }
  .item-body {
    padding: 0 10px;
    &:hover {
      background-color: #f0f0f0;
    }
    &.active {
      background-color: aqua;
    }
    &.active-step {
      background-color: antiquewhite;
    }
  }
}
input {
  border: 0;
  outline: 0;
}
/* Add your custom styles here */
</style>
