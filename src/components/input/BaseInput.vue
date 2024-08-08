<template>
  <div :style="`width: ${width}px`">
    <label v-if="label">{{ label }} <span v-if="isRequired" class="text-danger">*</span></label>
    <input ref="input" class="form-control" v-model="modelValue" :placeholder="placeholder" :type="type"
      @blur="validateInput" @change="change" />
    <!-- error warning -->
    <div v-if="error" class="text-danger error-text">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { PropType, Ref, ref } from "vue";

const props = defineProps({
  label: { type: String },
  placeholder: { type: String },
  type: { type: String },
  rules: { type: Array as PropType<Array<string>> | undefined },
  width: { type: Number }
});
const emit = defineEmits(["change"]);
// Define the modelValue property
const modelValue = defineModel('modelValue');
const isRequired = props.rules && props.rules.includes("required");
// Define the error property
const error: Ref<string> = ref('');
const change = (e) => {
  // Emit the input event
  emit("change", e);
};
const validateInput = () => {
  // Validate the input value
  error.value = validate(modelValue.value, props.rules);
};
const validate = (value: any, rules: Array<string> | undefined) => {
  if (rules === undefined) return '';
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    if (rule === "required" && !value) {
      return `${props.label} is required`;
    }
    if (rule === "email" && !validateEmail(value)) {
      return `${props.label} is not a valid email`;
    }
  }
  return '';
};
const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
</script>

<style lang="scss" scoped>
/* Add your custom styles here */
.error-text {
  font-size: 12px;
  font-family: "Helvetica-medium";
  margin-top: 5px;
}
</style>
