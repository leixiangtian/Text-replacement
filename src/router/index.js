// import Vue from "vue";
// import VueRouter from "vue-router";
import Home from "../views/index.vue";

// Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    // component: Home,
    component: resolve => require(['../views/index.vue'],resolve),
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
