const authenRouter = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/authen/LoginIndex.vue"),
  },
];

export default authenRouter;
