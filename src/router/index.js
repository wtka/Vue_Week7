import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/LoginView.vue"),    
  },
  {
    path: "/admin",    
    component: () => import("../views/AdminView.vue"),
    children: [
      {
        path: "products",
        component: () => import("../views/ProductsView.vue"),
      },
      {
        path: "order",
        component: () => import("../views/OrderView.vue"),
      },
      {
        path: "ticket",
        component: () => import("../views/TicketView.vue"),
      },
      {
        path: "post",
        component: () => import("../views/PostView.vue"),
      },
    ]
  },
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
