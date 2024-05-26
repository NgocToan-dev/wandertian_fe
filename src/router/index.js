import { createWebHistory, createRouter } from "vue-router";

import Homepage from "@/pages/main/homepage/Homepage.vue";
import About from "@/pages/main/about/About.vue";
import Contact from "@/pages/main/contact/Contact.vue";
import SearchPost from "../pages/main/search/SearchPost.vue";

const routes = [
  {
    path: "/",
    component: Homepage,
  },

  { name: "About", path: "/about", component: About },
  { name: "Contact", path: "/contact", component: Contact },
  // Search result
  { name: "Search", path: "/search/:search", component: SearchPost },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
