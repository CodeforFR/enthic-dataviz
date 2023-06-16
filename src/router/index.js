import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/recherche",
    name: "SearchComponent",
    component: () => import("../views/SearchComponent.vue"),
  },
  {
    path: "/entreprises/:siren",
    name: "DetailComponent",
    props: true,
    component: () => import("../views/DetailComponent.vue"),
  },
  {
    path: "/tops",
    name: "TopsPage",
    props: true,
    component: () => import("../views/TopsPage.vue"),
  },
  {
    path: "/sbf120",
    name: "SBF120Study",
    props: true,
    component: () => import("../views/SBF120Study.vue"),
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
