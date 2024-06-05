import { useLoading } from "vue-loading-overlay";

const $loading = useLoading({});

const showMask = () => {
  return $loading.show({
    // Optional parameters
    container: null,
  });
};

const hideMask = (loader) => {
  loader.hide();
};

const backToHome = (router) => {
  router.push({ path: "/" });
};

const logout = () => {
  // clear localstorage
  // clear sessionstorage
  // redirect to login page
  localStorage.clear();
  sessionStorage.clear();
  router.push({ name: "login" });
};

const isLogin = () => {
  return localStorage.getItem("token") ? true : false;
};

const emptyObjectId = "000000000000000000000000";

export default {
  showMask,
  hideMask,
  backToHome,
  logout,
  isLogin,
  emptyObjectId,
};
