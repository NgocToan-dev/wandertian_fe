const commonRouter = [
  {
    path: "/404",
    component: () => import("@/pages/common/NotFound.vue"),
  },
];

export default commonRouter;
