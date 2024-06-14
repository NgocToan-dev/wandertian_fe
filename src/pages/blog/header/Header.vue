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
        <RouterLink v-if="isAdmin" :to="{ path: '/admin' }">Admin</RouterLink>
        <!-- Login button if not logged and logout button if logged -->
        <button v-if="isLogin" class="btn btn-primary" @click="logout">Logout</button>
        <button v-else class="btn btn-primary" @click="goToLogin">Login</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import commonFn from "@/utilities/commonFn";
import { getCurrentInstance, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
const { proxy } = getCurrentInstance();
const isAdmin = ref(false);
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
const isLogin = ref(false);
onMounted(() => {
  isLogin.value = commonFn.checkAuth().loggedIn;
  isAdmin.value = commonFn.checkAuth().isAdmin;
});
const goToLogin = () => {
  proxy.$router.push("/login");
};
const logout = () => {
  commonFn.logout(proxy.$router);
};
</script>

<style lang="scss" scoped></style>
