import { createWebHistory, createRouter } from "vue-router";
import Index from "./pages/Index.vue";
import Projects from "./pages/Projects.vue";
import Freelance from "./pages/Freelance.vue";

const history = createWebHistory();
export const routes = [
  { path: "/", component: Index, name: "Home" },
  { path: "/projects", component: Projects, name: "Projects" },
  { path: "/freelance", component: Freelance, name: "Freelance" }
];

export const router = createRouter({ history, routes });