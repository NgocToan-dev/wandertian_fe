import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/pages/main/homepage/Homepage.vue"),
  },
  {
    path: "/404",
    component: () => import("@/pages/main/NotFound.vue"),
  },
  {
    name: "About",
    path: "/about",
    component: () => import("@/pages/main/about/About.vue"),
  },
  {
    name: "Contact",
    path: "/contact",
    component: () => import("@/pages/main/contact/Contact.vue"),
  },
  // Search result
  {
    name: "Search",
    path: "/search/:search",
    component: () => import("@/pages/main/search/SearchPost.vue"),
  },
  {
    name: "PostDetail",
    path: "/post/:id",
    component: () => import("@/pages/main/post/PostDetail.vue"),
  },
  {
    name: "PostEditor",
    path: "/post/:id/edit",
    component: () => import("@/pages/main/post/PostEditor.vue"),
  },
  // redirect to 404 page
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
