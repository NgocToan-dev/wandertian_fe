import { createWebHistory, createRouter } from "vue-router";

import Homepage from "@/pages/main/homepage/Homepage.vue";
import About from "@/pages/main/about/About.vue";
import Contact from "@/pages/main/contact/Contact.vue";
import SearchPost from "@/pages/main/search/SearchPost.vue";

const routes = [
  {
    path: "/",
    component: Homepage,
  },

  { name: "About", path: "/about", component: About },
  { name: "Contact", path: "/contact", component: Contact },
  // Search result
  { name: "Search", path: "/search/:search", component: SearchPost },
  {
    name: "Post",
    path: "/post/:id",
    component: () => import("@/pages/main/post/PostDetail.vue"),
  },
  {
    name: "PostEditor",
    path: "/post/editor/:id",
    component: () => import("@/pages/main/post/PostEditor.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
