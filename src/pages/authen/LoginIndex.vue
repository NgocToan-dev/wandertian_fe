<template>
  <section class="vh-100">
    <div
      class="background-image container-fluid h-100 d-flex justify-content-center align-items-center"
    >
      <div
        class="background-form d-flex justify-content-center align-items-center bg-light shadow-lg rounded-3"
      >
        <div class="col">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="img-fluid"
            alt="Sample image"
          />
        </div>
        <div class="vertical-divider"></div>
        <Login v-if="loginMode" @changeFormMode="changeFormMode"/>
        <Register v-else @changeFormMode="changeFormMode"/>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import Login from "./Login.vue";
import Register from "./Register.vue";

const loginMode = ref(true);
const changeFormMode = () => {
  loginMode.value = !loginMode.value;
};
</script>

<style lang="scss" scoped>
.background-image {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("@/assets/img/login-background.jpg");
  background-size: cover;
  background-position: center;
}
.background-form {
  height: 55%;
}
.vertical-divider {
  height: 100%;
  width: 1px;
  background-color: #e0e0e0;
}
.other-option {
  button {
    width: 30px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
a {
  cursor: pointer;
}
</style>
