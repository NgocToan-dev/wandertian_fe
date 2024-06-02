const adminRouter = [
  {
    name: "Admin",
    path: "/admin",
    component: () => import("@/pages/admin/AdminIndex.vue"),
    children: [
      {
        name: "Dashboard",
        path: "",
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
