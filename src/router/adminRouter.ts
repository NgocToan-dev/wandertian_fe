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
        name: "TaskIndex",
        path: "task",
        redirect: "/admin/task/list",
        component: () => import("@/pages/admin/task/TaskIndex.vue"),
        children: [
          {
            name: "TaskCalendarView",
            path: "calendar",
            component: () =>
              import("@/pages/admin/task/views/calendar/Calendar.vue"),
          },
          {
            name: "TaskListView",
            path: "list",
            component: () =>
              import("@/pages/admin/task/views/list/TaskList.vue"),
          },
          {
            name: "TaskGanttChartView",
            path: "ganttChart",
            component: () =>
              import("@/pages/admin/task/views/ganttChart/GanttChart.vue"),
          },
          {
            name: "TaskKanbanView",
            path: "kanban",
            component: () =>
              import("@/pages/admin/task/views/kanban/TaskKanban.vue"),
          },
          {
            name: "TaskTreeView",
            path: "tree",
            component: () =>
              import("@/pages/admin/task/views/tree/TaskTree.vue"),
          },
        ],
      },
    ],
  },
];

export default adminRouter;
