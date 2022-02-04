import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/recherche",
    name: "Search",
    component: () =>
      import("../views/Search.vue"),
  },
  {
    path: "/entreprises/:siren",
    name: "Detail",
    props: true,
    component: () =>
      import("../views/Detail.vue"),
  },
  {
    path: "/tops",
    name: "Tops",
    props: true,
    component: () =>
      import("../views/Tops.vue"),
  },
  {
    path: "/*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
