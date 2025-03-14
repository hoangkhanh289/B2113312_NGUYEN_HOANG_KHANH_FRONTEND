import { createRouter, createWebHistory } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";

const routes = [
  { path: "/", name: "contactbook", component: ContactBook },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
 {
    path: "/contacts/:id",
    name: "contact.edit",
    component: () => import("@/views/ContactEdit.vue"),
    props: true // Truyền các biến trong $route.params vào làm props
 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
