import { createWebHistory, createRouter } from "vue-router";
import blogRouter from "./blogRouter";
import adminRouter from "./adminRouter";
import commonRouter from "./commonRouter";
import authenRouter from "./authenRouter";

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
  // Redirect to login page if user not logged in
  if(to.name == 'login'){
    next();
    return;
  }
  if (!localStorage.getItem("token")) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
