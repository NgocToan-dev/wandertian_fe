<template>
  <VueFinalModal class="d-flex justify-content-center align-items-center" content-class="bg-light rounded-3 shadow-lg"
    overlay-transition="vfm-fade" content-transition="vfm-fade" @before-open="emit('before-open')"
    @before-close="emit('before-close')" @closed="emit('closed')" :drag="true" drag-selector=".modal_title">
    <div :style="{ width: width + 'px', height: height + 'px' }">
      <header class="d-flex py-2 px-3 justify-content-between align-items-center border-bottom">
        <h3>{{ title }}</h3>
        <div @click=" emit('confirm')">
          <i class="fas fa-times cursor-pointer fs-4"></i>
        </div>
      </header>
      <div style="height: calc(100% - 100px); overflow: auto" class="px-3 py-2">
        <slot name="modal__content" />
      </div>
      <footer class="d-flex flex-row-reverse py-2 px-3 border-top gap-2 align-items-center">
        <slot name="modal__footer" :close="() => emit('confirm')" />
      </footer>
    </div>
  </VueFinalModal>
</template>
<script setup>
import { VueFinalModal } from "vue-final-modal";
const props = defineProps({
  title: String,
  classBody: String,
  width: String,
  height: String,
});
const emit = defineEmits(["before-open", "before-close", "closed", "confirm"]);
</script>

<style lang="scss" scoped>
header {
  height: 50px;
}

footer {
  height: 50px;
}
</style>
