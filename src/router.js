import VueRouter from "vue-router";
import Vue from "vue";

// import pages
import NotFound from "@/components/errors/NotFound.vue";

import HomePage from "@/components/pages/HomePage.vue";

import LoginPage from "@/components/pages/auth/LoginPage.vue"

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/auth/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  },
];

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

export default router;