const adminRouter = [
  {
    name: "Admin",
    path: "/admin",
    redirect: "/admin/post",
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
        name: "PostList",
        path: "post",
        component: () => import("@/pages/admin/post/PostList.vue"),
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
      {
        name: "Statistics",
        path: "statistics",
        component: () => import("@/pages/admin/statistics/Statistics.vue"),
      },
      {
        name: "Calendar",
        path: "calendar",
        component: () => import("@/pages/admin/task/Calendar.vue"),
      },
    ],
  },
];

export default adminRouter;
