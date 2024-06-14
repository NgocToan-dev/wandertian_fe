<template>
  <div :class="{ 'readOnlyView': readOnly }">
    <froala :tag="'textarea'" :config="config" v-model:value="model" :disabled="readOnly">
    </froala>
  </div>
</template>

<script setup>

const model = defineModel('content');

const props = defineProps({
  readOnly: {
    type: Boolean,
    default: false,
  }
});
const config = {
  events: {
    initialized: function () {
      const editor = this;
      if (props.readOnly == true) {
        editor.toolbar.hide();
        editor.edit.off(); // Disable editing on read-only change
      } else {
        editor.edit.on(); // Enable editing on non-read-only change
      }
    }
  },
  pluginsEnabled: ['table', 'align', 'image', 'video'] // Enable the table plugin
};

</script>


<style lang="scss">
#fr-logo {
  display: none;
}

.readOnlyView {
  .fr-wrapper {
    border: none !important;
    .fr-view{
      padding: 0 !important;
    }
  }

  .fr-second-toolbar {
    border: none !important;
  }
}
</style>

