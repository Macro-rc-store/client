import VueRouter from "vue-router";
import Vue from "vue";

// import pages
import NotFound from "@/components/errors/NotFound.vue";

import HomePage from "@/components/pages/HomePage.vue";

import LoginPage from "@/components/pages/auth/LoginPage.vue";
import RegisterPage from "@/components/pages/auth/RegisterPage.vue";
import ChangePasswordPage from "@/components/pages/account/ChangePasswordPage.vue"

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
    path: '/auth/register',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/user/change-password',
    name: 'ChangePasswordPage',
    component: ChangePasswordPage
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
  routes
});

export default router;