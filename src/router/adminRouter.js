const adminRouter = [
  {
    name: "Admin",
    path: "/admin",
    redirect: "/admin/tag",
    component: () => import("@/pages/admin/AdminIndex.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        name: "Dashboard",
        path: "dashboard",
        component: () => import("@/pages/admin/dashboard/Dashboard.vue"),
      },
      {
        name: "PostEditor",
        path: "post/:id",
        component: () => import("@/pages/admin/post/PostEditor.vue"),
      },
      {
        name: "CategoryList",
        path: "category",
        component: () => import("@/pages/admin/category/CategoryList.vue"),
      },
      {
        name: "TagList",
        path: "tag",
        component: () => import("@/pages/admin/tag/TagList.vue"),
      },
    ],
  },
];

export default adminRouter;
