<template>
  <div class="container h-100 flex-column d-flex">
    <QuillEditor toolbar="essential" />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
:deep(.ql-container) {
  flex-grow: 1;
}
</style>
