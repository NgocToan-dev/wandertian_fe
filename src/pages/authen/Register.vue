<template>
  <div
    ref="formRegister"
    class="col p-5 d-flex flex-column justify-content-center align-content-center"
  >
    <!-- Email input -->
    <div data-mdb-input-init class="form-outline mb-3">
      <BaseInput
        type="email"
        label="Email address"
        v-model="model.email"
        placeholder="Enter a valid email address"
        :rules="['required', 'email']"
      />
    </div>
    <!-- Password input -->
    <div data-mdb-input-init class="form-outline mb-3">
      <BaseInput
        label="Username"
        v-model="model.username"
        placeholder="Enter username"
        :rules="['required']"
      />
    </div>

    <!-- Password input -->
    <div data-mdb-input-init class="form-outline mb-3">
      <BaseInput
        type="password"
        label="Password"
        v-model="model.password"
        placeholder="Enter password"
        :rules="['required']"
      />
    </div>
    <!-- Password input -->
    <div data-mdb-input-init class="form-outline mb-3">
      <BaseInput
        type="password"
        label="Confirm password"
        v-model="model.confirmPassword"
        placeholder="Confirm password"
        :rules="['required']"
      />
    </div>

    <div class="text-center text-lg-center pt-2">
      <div class="d-flex justify-content-center">
        <button
          type="button"
          data-mdb-button-init
          data-mdb-ripple-init
          class="btn btn-primary btn-signup"
          style="padding-left: 2.5rem; padding-right: 2.5rem"
          @click="signup"
        >
          <!-- loading gif -->
          <img v-if="isRegistering" src="@/assets/img/loading-white.gif" alt="loading" />
          <span v-if="!isRegistering">Sign up</span>
        </button>
      </div>
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
        <a class="link-primary cursor-pointer" @click="goToLogin">Login</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import userApi from "@/apis/system/userApi";
import { ref, defineEmits, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const model = ref({
  username: "",
  password: "",
});
const isRegistering = ref(false);
const emit = defineEmits(["changeFormMode"]);
const goToLogin = () => {
  proxy.$router.push("/login");
};
const signupByFacebook = () => {
  console.log("Sign up by Facebook");
};
const signupByGoogle = () => {
  console.log("Sign up by Google");
};
const signup = async () => {
  const formRegister = proxy.$refs.formRegister;
  // check if form is valid by blur all the input
  const inputs = formRegister.querySelectorAll("input");
  inputs.forEach((input) => {
    input.dispatchEvent(new Event("blur"));
  });
  proxy.$nextTick(async () => {
    // if form has error-text class, it means the form is invalid
    const errorTexts = formRegister.querySelector(".error-text");
    if (errorTexts) {
      return;
    }
    // check if password and confirm password are the same
    if (model.password !== model.confirmPassword) {
      proxy.$toast.error("Password and confirm password are not the same");
      return;
    }
    // remove unnecessary field
    try {
      isRegistering.value = true;
      const res = await userApi.signUp(model.value);
      if (res.data) {
        // check email existed
        if (res.data.error) {
          switch (res.data.error) {
            case proxy.$global.ValidateSave.DUPLICATE_EMAIL:
              proxy.$toast.error("Email existed");
              break;
            case proxy.$global.ValidateSave.DUPLICATE_USERNAME:
              proxy.$toast.error("Username existed");
              break;
            default:
              proxy.$toast.error("Sign up failed");
              break;
          }
          return;
        }
        if (res.data) {
          proxy.$toast.success("Sign up successfully");
          proxy.$router.push({ name: "login", query: { email: model.value.email } });
        }
      } else {
        proxy.$toast.error("Sign up failed");
      }
    } finally {
      isRegistering.value = false;
    }
  });
};
</script>

<style lang="scss" scoped>
.btn-signup {
  width: 90px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  img {
    object-fit: cover;
    width: 20px;
  }
}
</style>
