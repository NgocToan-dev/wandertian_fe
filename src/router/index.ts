import { createWebHistory, createRouter } from "vue-router";
import blogRouter from "./blogRouter";
import adminRouter from "./adminRouter";
import commonRouter from "./commonRouter";
import authenRouter from "./authenRouter";
import commonFn from "@/utilities/commonFn";

const routes = [
  ...commonRouter,
  ...blogRouter,
  ...adminRouter,
  ...authenRouter,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  // Redirect to login page if user not logged in, if user logged in, redirect to home page
  const authCheck = commonFn.checkAuth();
  if (!authCheck.loggedIn) {
    if (to.meta.requiresAuth) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    if (to.name === "login" || (to.meta.requiresAuth && !authCheck.isAdmin)) {
      next({ path: "/home" });
    } else {
      next();
    }
  }
});

export default router;
