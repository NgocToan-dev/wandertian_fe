<template>
  <li
    :class="{ folder: isFolder }"
    class="item d-flex align-items-center justify-content-between gap-2 my-2 border border-secondary p-2 rounded"
  >
    <component v-if="componentId" :is="componentId" :model="item"></component>
    <div v-if="isFolder" @click="toggle">
      <div v-if="!open" class="text-secondary cursor-pointer">
        <i class="fa-solid fa-plus"></i>
      </div>
      <div v-else class="text-secondary cursor-pointer">
        <i class="fa-solid fa-minus"></i>
      </div>
    </div>
  </li>
  <ul v-show="open" v-if="isFolder">
    <TreeItem v-for="subItem in item.children" :key="subItem._id" :item="subItem" :component-id="componentId">
    </TreeItem>
  </ul>
</template>

<script lang="ts">
import { watch, computed, PropType, ref } from "vue";
export default {
  name: "TreeItem",
  props: {
    item: {
      type: Object as PropType<any>,
      required: true,
    },
    componentId: null,
  },
  setup(props) {
    const open = ref(props.item?.open);

    const isFolder = computed(() => {
      return props.item?.children?.length;
    });
    const toggle = () => {
      if (isFolder.value) {
        open.value = !open.value;
      }
    };
    return {
      open,
      isFolder,
      toggle,
    };
  },
};
</script>

<style lang="scss" scoped>
.tree-view > ul {
  padding-left: 16px;
}

.tree-view li {
  list-style-type: none;
  margin: 0;
  padding: 10px 5px 0;
  position: relative;
}

.tree-view li:last-child {
  margin-bottom: 10px;
}

.tree-view li::after,
.tree-view li::before {
  content: "";
  left: -30px;
  position: absolute;
  right: auto;
}

.tree-view li::before {
  border-left: 1px solid #405567;
  height: calc(100% + 10px);
  top: 0;
  width: 1px;
}

.tree-view li::after {
  border-top: 1px solid #405567;
  height: 20px;
  top: 20px;
  width: 35px;
}

.tree-view .item {
  border: 1px solid #405567;
  border-radius: 2px;
  background-color: #fff;
  display: inline-block;
  padding: 2px 6px;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.tree-view .folder {
  background-color: #fbf897;
}

.tree-view > ul > li::after,
.tree-view > ul > li::before {
  border: 0;
}

.tree-view li:last-child::before {
  height: 20px;
}
</style>
