<template>
  <header class="border-bottom position-fixed top-0 w-100 bg-white z-3">
    <div class="container d-flex justify-content-between align-items-center py-2">
      <div class="logo fs-4 cursor-pointer" @click="backToHome">Wandertian</div>
      <div class="d-flex gap-3 align-items-center">
        <RouterLink
          v-for="(link, index) in links"
          class="fs-5 link-offset-2 link-underline link-underline-opacity-0 fs-6"
          :class="[
            link.path == $route.path
              ? 'border border-2 border-primary text-primary rounded-5 px-2'
              : 'text-dark',
          ]"
          :to="{ path: link.path }"
          >{{ link.name }}</RouterLink
        >
      </div>
    </div>
  </header>
</template>

<script setup>
import commonFn from "../../utilities/commonFn";
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
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
];
const backToHome = () => {
  commonFn.backToHome(proxy.$router);
};
</script>

<style lang="scss" scoped></style>
