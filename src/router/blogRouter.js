const blogRouter = [
  {
    path: "/",
    redirect: "/home",
    component: () => import("@/pages/blog/BlogIndex.vue"),
    children: [
      {
        name: "Home",
        path: "home",
        component: () => import("@/pages/blog/main/homepage/Homepage.vue"),
      },
      {
        name: "About",
        path: "about",
        component: () => import("@/pages/blog/main/about/About.vue"),
      },
      {
        name: "Contact",
        path: "contact",
        component: () => import("@/pages/blog/main/contact/Contact.vue"),
      },
      {
        name: "PostDetail",
        path: "post/:id",
        component: () => import("@/pages/blog/main/post/PostDetail.vue"),
      },
      {
        name: "SearchResult",
        path: "search",
        component: () => import("@/pages/blog/main/search/SearchResult.vue"),
      },
    ],
  },
];

export default blogRouter;
