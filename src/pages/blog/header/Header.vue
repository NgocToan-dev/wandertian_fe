<template>
  <header class="border-bottom position-fixed top-0 w-100 bg-white z-3">
    <div class="container d-flex justify-content-between align-items-center py-2">
      <div class="logo fs-4 cursor-pointer" @click="backToHome">Wandertian</div>
      <div class="d-flex gap-4 align-items-center">
        <RouterLink
          v-for="(link, index) in links"
          class="header-item fs-5 link-offset-2 link-underline link-underline-opacity-0 fs-6 text-dark"
          :class="[link.path == $route.path ? 'active' : '']"
          :to="{ path: link.path }"
          >{{ link.name }}</RouterLink
        >
        <RouterLink
          v-if="isAdmin"
          :to="{ path: '/admin' }"
          class="header-item fs-5 link-offset-2 link-underline link-underline-opacity-0 fs-6 text-dark"
          >Admin</RouterLink
        >
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
    path: "/home",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Study With Me",
    path: "/studyWithMe",
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

<style lang="scss" scoped>
.header-item {
  transition: 0.3s;
  position: relative;
  // Set active link style here with border circle and bold font
  &.active {
    font-weight: bold;
    &::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 2px;
      background-color: #000;
    }
  }
}
</style>
