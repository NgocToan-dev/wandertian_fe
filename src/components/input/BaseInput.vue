<template>
  <div>
    <label>{{ label }}</label>
    <input
      ref="input"
      class="form-control"
      v-model="modelValue"
      :placeholder="placeholder"
      :type="type"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  placeholder: String,
  type: String,
});
// Define the modelValue property
const modelValue = defineModel({
  prop: "modelValue",
  event: "update:modelValue",
});
</script>

<style lang="scss" scoped>
/* Add your custom styles here */
</style>
