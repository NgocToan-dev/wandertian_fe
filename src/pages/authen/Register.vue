<template>
  <div
    class="col p-5 d-flex flex-column justify-content-center align-content-center"
  >
    <!-- Email input -->
    <div data-mdb-input-init class="form-outline mb-3">
      <label class="form-label">Email address</label>
      <input
        type="email"
        v-model="model.username"
        class="form-control"
        placeholder="Enter a valid email address"
      />
    </div>

    <!-- Password input -->
    <div data-mdb-input-init class="form-outline mb-3">
      <label class="form-label">Password</label>
      <input
        type="password"
        v-model="model.password"
        class="form-control"
        placeholder="Enter password"
      />
    </div>
    <!-- Password input -->
    <div data-mdb-input-init class="form-outline mb-3">
      <label class="form-label">Confirm password</label>
      <input
        type="password"
        class="form-control"
        v-model="model.confirmPassword"
        placeholder="Confirm password"
      />
    </div>

    <div class="text-center text-lg-center pt-2">
      <button
        type="button"
        data-mdb-button-init
        data-mdb-ripple-init
        class="btn btn-primary"
        style="padding-left: 2.5rem; padding-right: 2.5rem"
      >
        Sign up
      </button>
      <div
        class="other-option d-flex flex-row align-items-center justify-content-center mt-3"
      >
        <p class="lead mb-0 me-3 fw-normal fs-6">Sign up with</p>
        <button
          type="button"
          data-mdb-button-init
          data-mdb-ripple-init
          class="btn btn-outline-primary btn-floating mx-1 rounded-circle"
          @click="signupByFacebook"
        >
          <i class="fab fa-facebook-f"></i>
        </button>

        <button
          type="button"
          data-mdb-button-init
          data-mdb-ripple-init
          class="btn btn-outline-primary btn-floating mx-1 rounded-circle"
          @click="signupByGoogle"
        >
          <i class="fab fa-google"></i>
        </button>

      </div>
      <p class="small fw-bold mt-2 pt-1 mb-0">
        Already have an account?
        <a class="link-primary cursor-pointer" @click="changeFormMode">Login</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
const model = ref({
  username: "",
  password: "",
});
const emit = defineEmits(["changeFormMode"]);
const changeFormMode = () => {
  emit("changeFormMode");
};
const signupByFacebook = () => {
  console.log("Sign up by Facebook");
};
const signupByGoogle = () => {
  console.log("Sign up by Google");
};
const signup = () => {
  // check if password and confirm password are the same
  if (model.password !== model.confirmPassword) {
    alert("Password and confirm password are not the same");
    return;
  }
  console.log("Sign up");
};
</script>

<style lang="scss" scoped></style>
