<template>
  <DynamicModal
    :width="width"
    :title="title"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <template #modal__content>
      <div v-html="message"></div>
    </template>
    <template #modal__footer="{ close }">
      <button @click="confirmPopup" class="btn btn-primary btn-sm">Agree</button>
      <button @click="close" class="btn btn-outline-primary btn-sm">Cancel</button>
    </template>
  </DynamicModal>
</template>

<script>
import baseModal from "@/pages/base/baseModal";
import { getCurrentInstance } from "vue";

export default {
  extends: baseModal,
  setup() {
    const { proxy } = getCurrentInstance();
    const _formParam = proxy.$attrs.params;
    const title = _formParam.title;
    const message = _formParam.message;
    const width = _formParam.width || "500";
    const callback = _formParam.callback;
    const confirmPopup = () => {
      callback();
      proxy.$emit("confirm");
    };
    return {
      title,
      message,
      width,
      confirmPopup,
    };
  },
};
</script>

<style lang="scss" scoped></style>
