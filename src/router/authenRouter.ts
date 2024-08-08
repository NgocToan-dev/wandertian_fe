const authenRouter = [
  {
    path: "/LoginPage",
    component: () => import("@/pages/authen/LoginIndex.vue"),
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("@/pages/authen/Login.vue"),
      },
      {
        path: "/register",
        name: "register",
        component: () => import("@/pages/authen/Register.vue"),
      },
    ],
  },
];

export default authenRouter;
