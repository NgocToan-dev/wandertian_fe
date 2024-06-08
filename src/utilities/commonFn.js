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
  backToHome,
  logout,
  isLogin,
  emptyObjectId,
};
