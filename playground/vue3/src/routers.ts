import { createRouter, createWebHistory } from "vue-router";

import StylePlayground from "./StylePlayground/index.vue";

export const routes = [
  { path: "/style", component: StylePlayground, meta: { title: "style" } },
  {
    path: "/esbuild",
    component: () => import("./EsbuildPlayground/index.vue"),
    meta: { title: "esbuild" },
  },
] as const;

export const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", redirect: "/style" }, ...routes],
});
