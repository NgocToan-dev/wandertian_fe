<template>
  <DynamicModal
    :title="title"
    @before-open="beforeOpen"
    @before-close="beforeClose"
    width="600"
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
            <div class="col-9 row flex-nowrap">
              <div class="col">
                <input
                  type="radio"
                  class="btn-check"
                  name="options-outlined"
                  autocomplete="off"
                  id="btn1"
                  checked
                />
                <label
                  class="btn btn-outline-primary d-flex gap-2 align-items-center"
                  for="btn1"
                >
                  <i class="fa-regular fa-star"></i>
                  Events
                </label>
              </div>
              <div class="col">
                <input
                  type="radio"
                  class="btn-check"
                  name="options-outlined"
                  autocomplete="off"
                  id="btn2"
                />
                <label
                  class="btn btn-outline-primary d-flex gap-2 align-items-center"
                  for="btn2"
                >
                  <i class="fa-regular fa-comments"></i>
                  Meet</label
                >
              </div>
              <div class="col">
                <input
                  type="radio"
                  class="btn-check"
                  name="options-outlined"
                  autocomplete="off"
                  id="btn3"
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
          <!-- Date -->
          <div class="row align-items-center">
            <div class="d-flex col-3">
              <div class="icon">
                <i class="fa-solid fa-calendar-days"></i>
              </div>
              <div class="text-left">Start Date</div>
            </div>
            <div class="col-9 d-flex gap-2">
              <base-input type="date" />
              <base-input type="time" />
            </div>
          </div>
          <!-- Time -->
          <div class="row align-items-center">
            <div class="d-flex col-3">
              <div class="icon">
                <i class="fa-solid fa-calendar-days"></i>
              </div>
              <div class="text-left">End Date</div>
            </div>
            <div class="col-9 d-flex gap-3 align-items-center">
              <div class="col-9 d-flex gap-2">
                <base-input type="date" />
                <base-input type="time" />
              </div>
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
              ></textarea>
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
              <base-input type="text" />
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
              <base-input type="text" />
            </div>
          </div>
          <!-- Colors -->
          <div class="row align-items-center">
            <div class="d-flex col-3">
              <div class="icon">
                <i class="fa-solid fa-droplet"></i>
              </div>
              <div class="text-left">Color</div>
            </div>
            <div class="col-9">
              <base-input type="color" width="100" />
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
import { defineComponent } from "vue";
import baseModal from "@/pages/base/baseModal";

export default defineComponent({
  name: "CategoryDetail",
  extends: baseModal,
  setup() {
    const module: string = "event";

    return {
      module,
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
