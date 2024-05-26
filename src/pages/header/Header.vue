<template>
  <header class="border-bottom">
    <div class="container d-flex justify-content-between align-items-center py-2">
      <div class="logo fs-4">Wandertian</div>
      <div class="d-flex gap-3">
        <RouterLink
          v-for="(link, index) in links"
          class="fs-5 link-offset-2 link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
          :class="{ 'link-underline-opacity-75': link.path == $route.path }"
          :to="{ path: link.path }"
          >{{ link.name }}</RouterLink
        >
      </div>
    </div>
  </header>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
] ;
</script>

<style lang="scss" scoped></style>
