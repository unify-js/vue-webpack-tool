import { createRouter, createWebHistory } from "vue-router";

import EsbuildPlayground from "./EsbuildPlayground/index.vue";

export const routes = [
  {
    path: "/esbuild",
    component: EsbuildPlayground,
    meta: { title: "esbuild" },
  },
  {
    path: "/style",
    component: () => import("./StylePlayground/index.vue"),
    meta: { title: "style" },
  },
  {
    path: "/access",
    component: () => import("./AccessPlayground/index.vue"),
    meta: { title: "access" },
  },
] as const;

export const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", redirect: "/esbuild" }, ...routes],
});
