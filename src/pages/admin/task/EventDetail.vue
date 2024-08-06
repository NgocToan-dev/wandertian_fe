<template>
  <DynamicModal title="Event Detail" @before-open="beforeOpen" @before-close="beforeClose" width="500">
    <template #modal__content>
      <div class="form-group mt-2">
        <div v-html="model.title"></div>
        <div v-html="model.contentFull"></div>
      </div>
    </template>
    <template #modal__footer="{ close }">
      <button @click="close" class="btn btn-outline-danger btn-sm">Cancel</button>
    </template>
  </DynamicModal>
</template>

<script>
import baseModal from "../../base/baseModal";

export default {
  name: "CategoryDetail",
  extends: baseModal,
}
</script>