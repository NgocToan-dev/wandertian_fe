<template>
  <div class="col p-5 d-flex flex-column justify-content-center align-content-center">
    <div class="other-option d-flex flex-row align-items-center justify-content-center">
      <p class="lead fw-normal mb-0 me-3">Sign in with</p>
      <button
        type="button"
        data-mdb-button-init
        data-mdb-ripple-init
        class="btn btn-outline-primary btn-floating mx-1"
        @click="loginByFacebook"
      >
        <i class="fab fa-facebook-f"></i>
      </button>

      <button
        type="button"
        data-mdb-button-init
        data-mdb-ripple-init
        class="btn btn-outline-primary btn-floating mx-1"
        @click="loginByGoogle"
      >
        <i class="fab fa-google"></i>
      </button>
    </div>

    <div class="divider d-flex align-items-center justify-content-center my-2">
      <hr class="flex-grow-1" />
      <p class="text-center fw-bold mx-3 mb-0">Or</p>
      <hr class="flex-grow-1" />
    </div>

    <!-- Email input -->
    <div data-mdb-input-init class="form-outline mb-4">
      <label class="form-label" for="form3Example3">Email address</label>
      <input
        type="email"
        id="form3Example3"
        class="form-control"
        v-model="model.username"
        placeholder="Enter a valid email address"
      />
    </div>

    <!-- Password input -->
    <div data-mdb-input-init class="form-outline mb-3">
      <label class="form-label" for="form3Example4">Password</label>
      <input
        type="password"
        id="form3Example4"
        class="form-control"
        v-model="model.password"
        placeholder="Enter password"
      />
    </div>

    <div class="d-flex justify-content-between align-items-center">
      <!-- Checkbox -->
      <div class="form-check mb-0">
        <input
          class="form-check-input me-2"
          type="checkbox"
          value=""
          v-model="model.rememberMe"
          id="form2Example3"
        />
        <label class="form-check-label" for="form2Example3"> Remember me </label>
      </div>
      <a class="link-secondary">Forgot password?</a>
    </div>

    <div class="text-center text-lg-center mt-4 pt-2">
      <button
        type="button"
        data-mdb-button-init
        data-mdb-ripple-init
        class="btn btn-primary"
        style="padding-left: 2.5rem; padding-right: 2.5rem"
        @click="login"
      >
        Login
      </button>
      <p class="small fw-bold mt-2 pt-1 mb-0">
        Don't have an account?
        <a class="link-danger cursor-pointer" @click="changeFormMode">Register</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import userApi from "@/apis/system/userApi";
import { useContextStore } from "@/store/common/contextStore";
import { useLoadingStore } from "@/store/common/loadingStore";
import commonFn from "@/utilities/commonFn";
import { ref, defineEmits, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const contextStore = useContextStore();
const mask = useLoadingStore();
const model = ref({
  username: "",
  password: "",
});
const emit = defineEmits(["changeFormMode"]);
const changeFormMode = () => {
  emit("changeFormMode");
};
const login = async () => {
  try {
    mask.show();
    const res = await userApi.checkLogin(model.value);
    if (res?.data && res.data.token) {
      contextStore.loadContextStore(res.data.context);
      // Set token to cookie
      commonFn.setCookie("token", res.data.token, 1);
      if (res.data.isAdmin) {
        commonFn.setCookie("isAdmin", res.data.isAdmin, 1);
      }
      proxy.$toast.success("Login successfully");
      proxy.$router.push("/");
    } else {
      proxy.$toast.error("Login failed");
    }
  } finally {
    mask.hide();
  }
};
</script>

<style lang="scss" scoped></style>
