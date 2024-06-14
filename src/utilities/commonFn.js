const backToHome = (router) => {
  router.push({ path: "/" });
};

const logout = (router) => {
  // clear localstorage
  // clear sessionstorage
  // redirect to login page
  localStorage.clear();
  sessionStorage.clear();
  // clear all cookies
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }

  router.push({ name: "login" });
};

const isLogin = () => {
  return localStorage.getItem("token") ? true : false;
};

const emptyObjectId = "000000000000000000000000";

// Check if user is logged in by get token from cookie
const checkAuth = () => {
  const token = getCookie("token");
  const isAdmin = getCookie("isAdmin");
  return {
    loggedIn: token ? true : false,
    isAdmin: isAdmin == "true" ? true : false,
  };
};

/**
 * Gets the value of a cookie with the specified name.
 * @param {string} key - The name of the cookie.
 * @returns {string} The value of the cookie.
 */
const getCookie = (key) => {
  const cookies = document.cookie.split(";").map((cookie) => {
    const arr = cookie.split("=");
    // remove space
    return [arr[0].trim(), arr[1]];
  });
  return Object.fromEntries(cookies)[key.trim()];
};
/**
 * Sets a cookie with the specified name, value, and expiration days.
 *
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @param {number} days - The number of days until the cookie expires.
 */
const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
};

export default {
  backToHome,
  logout,
  isLogin,
  emptyObjectId,
  checkAuth,
  setCookie,
};
