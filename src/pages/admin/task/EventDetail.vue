<template>
  <DynamicModal
    :title="title"
    @before-open="beforeOpen"
    @before-close="beforeClose"
    width="750"
  >
    <template #modal__content>
      <div class="form-group my-2">
        <div class="d-flex flex-column gap-3">
          <!-- Title -->
          <div class="row align-items-center">
            <div class="d-flex col-3">
              <div class="icon">
                <i class="fa-solid fa-pen-to-square"></i>
              </div>
              <div class="text-left">Title</div>
            </div>
            <div class="col-9">
              <base-input type="text" v-model="model.title" />
            </div>
          </div>
          <!-- Type -->
          <div class="row align-items-center">
            <div class="d-flex col-3">
              <div class="icon">
                <i class="fa-solid fa-list"></i>
              </div>
              <div class="text-left">Type</div>
            </div>
            <div class="col-9 d-flex flex-nowrap gap-3">
              <div class="flex-grow-1">
                <input
                  type="radio"
                  class="btn-check"
                  name="options-outlined"
                  autocomplete="off"
                  id="btn1"
                  v-model="model.type"
                />
                <label
                  class="btn btn-outline-primary d-flex gap-2 align-items-center"
                  for="btn1"
                >
                  <i class="fa-regular fa-star"></i>
                  Events
                </label>
              </div>
              <div class="flex-grow-1">
                <input
                  type="radio"
                  class="btn-check"
                  name="options-outlined"
                  autocomplete="off"
                  id="btn2"
                  v-model="model.type"
                />
                <label
                  class="btn btn-outline-primary d-flex gap-2 align-items-center"
                  for="btn2"
                >
                  <i class="fa-regular fa-comments"></i>
                  Meet</label
                >
              </div>
              <div class="flex-grow-1">
                <input
                  type="radio"
                  class="btn-check"
                  name="options-outlined"
                  autocomplete="off"
                  id="btn3"
                  v-model="model.type"
                />
                <label
                  class="btn btn-outline-primary d-flex gap-2 align-items-center"
                  for="btn3"
                >
                  <i class="fa-solid fa-list-check"></i>
                  Task</label
                >
              </div>
            </div>
          </div>
          <!-- Priority -->
          <div class="row align-items-center">
            <div class="d-flex col-3">
              <div class="icon">
                <i class="fa-solid fa-droplet"></i>
              </div>
              <div class="text-left">Priority</div>
            </div>
            <div class="col-9">
              <Combobox
                enum="TaskPriority"
                valueField="value"
                displayField="text"
                v-model="model.priority"
              >
                <template #item-icon="{ item }">
                  <i class="fa-solid fa-folder" :style="{ color: getBgColor(item) }"></i>
                </template>
              </Combobox>
            </div>
          </div>
          <!-- Time -->
          <div class="row align-items-center">
            <div class="d-flex col-3">
              <div class="icon">
                <i class="fa-solid fa-calendar-days"></i>
              </div>
              <div class="text-left">Time</div>
            </div>
            <div class="col-9 d-flex gap-3">
              <base-input
                class="flex-grow-1"
                type="datetime-local"
                v-model="model.startDate"
              />
              <base-input
                class="flex-grow-1"
                type="datetime-local"
                v-model="model.endDate"
              />
            </div>
          </div>

          <!-- Status -->
          <div class="row align-items-center">
            <div class="d-flex col-3">
              <div class="icon">
                <i class="fa-solid fa-check"></i>
              </div>
              <div class="text-left">Status</div>
            </div>
            <div class="col-9">
              <Combobox
                enum="TaskStatus"
                valueField="value"
                displayField="text"
                v-model="model.status"
              >
              </Combobox>
            </div>
          </div>
          <!-- Note -->
          <div class="row align-items-center">
            <div class="d-flex col-3">
              <div class="icon">
                <i class="fa-solid fa-bars"></i>
              </div>
              <div class="text-left">Note</div>
            </div>
            <div class="col-9">
              <textarea
                class="form-control"
                placeholder="Leave a note here"
                id="floatingTextarea2"
                style="height: 50px"
                v-model="model.note"
              ></textarea>
            </div>
          </div>
          <!-- Parent task -->
          <div class="row align-items-center">
            <div class="d-flex col-3">
              <div class="icon">
                <i class="fa-solid fa-folder"></i>
              </div>
              <div class="text-left">Parent Task</div>
            </div>
            <div class="col-9">
              <Combobox
                :data="items"
                :columns="taskColumns"
                valueField="_id"
                displayField="title"
                v-model="model.parentId"
              >
              </Combobox>
            </div>
          </div>
        </div>
        <hr />
        <div class="d-flex flex-column gap-3">
          <!-- Link -->
          <div class="row align-items-center">
            <div class="d-flex col-3">
              <div class="icon">
                <i class="fa-solid fa-link"></i>
              </div>
              <div class="text-left">Link</div>
            </div>
            <div class="col-9">
              <base-input type="text" v-model="model.link" />
            </div>
          </div>
          <!-- Location -->
          <div class="row align-items-center">
            <div class="d-flex col-3">
              <div class="icon">
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <div class="text-left">Location</div>
            </div>
            <div class="col-9">
              <base-input type="text" v-model="model.location" />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #modal__footer="{ close }">
      <div class="d-flex justify-content-between w-100">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            v-model="model.isReminder"
          />
          <label class="form-check-label">Set reminders</label>
        </div>
        <div class="d-flex gap-2">
          <button @click="close" class="btn btn-outline-primary btn-sm">Cancel</button>
          <button @click="save" class="btn btn-primary btn-sm">Save</button>
        </div>
      </div>
    </template>
  </DynamicModal>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, Ref, ref } from "vue";
import baseModal from "@/pages/base/baseModal";
import { useTaskStore } from "@/store/business/taskStore";
import Combobox from "@/components/combobox/Combobox.vue";
import commonFn from "@/utilities/commonFn";

export default defineComponent({
  name: "CategoryDetail",
  extends: baseModal,
  setup() {
    const { proxy } = getCurrentInstance() as any;
    const module: string = "event";
    const store = useTaskStore();
    const items: Ref<Array<any>> = ref([]);
    onMounted(async () => {
      const res: any[] = await store.load();
      if (Array.isArray(res)) {
        items.value = res.filter((item) => item._id !== proxy.model._id);
      }
    });
    const taskColumns = [
      {
        dataField: "title",
        title: "Title",
      },
    ];
    const getBgColor = (item: any) => {
      return commonFn.getEnumValue("TaskPriority", item.value).bg || "black";
    };
    return {
      module,
      store,
      items,
      taskColumns,
      getBgColor,
    };
  },
});
</script>

<style lang="scss">
.text-left,
.icon {
  color: gray;
}

.icon {
  width: 20px;
  margin-right: 16px;
}
</style>
