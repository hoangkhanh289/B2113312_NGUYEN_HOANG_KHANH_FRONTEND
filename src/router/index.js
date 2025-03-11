import { createRouter, createWebHistory } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";

const routes = [
  { path: "/", name: "contactbook", component: ContactBook },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
