<template>
  <div>
    <froala v-if="!readOnly" :config="config" v-model:value="model">
    </froala>
    <froalaView v-if="readOnly" v-model:value="model"/>
  </div>
</template>

<script setup>
const model = defineModel("content");

const props = defineProps({
  readOnly: {
    type: Boolean,
    default: false,
  },
});
const config = {
  tabSpaces: 4,
  pastePlain: true,
  spellcheck: false,
  charCounterCount: false,
  placeholderText: "How's it going today? Do you have fun? Any story?",
  events: {
    initialized: function () {
      const editor = this;
      if (props.readOnly == true) {
        editor.toolbar.hide();
        editor.edit.off(); // Disable editing on read-only change
      } else {
        editor.edit.on(); // Enable editing on non-read-only change
      }
    },
  },
};
</script>

<style lang="scss">
#fr-logo {
  display: none;
}


</style>
