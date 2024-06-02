import { createWebHistory, createRouter } from "vue-router";
import blogRouter from "./blogRouter";
import adminRouter from "./adminRouter";
import commonRouter from "./commonRouter";

const routes = [...commonRouter, ...blogRouter, ...adminRouter];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
