import VueRouter from "vue-router";
import Vue from "vue";

// Import pages
import NotFound from "@/components/errors/NotFound.vue";

import HomePage from "@/components/pages/HomePage.vue";

import MailServices from "@/components/pages/services/MailServices.vue";

import LoginPage from "@/components/pages/auth/LoginPage.vue";
import RegisterPage from "@/components/pages/auth/RegisterPage.vue";

import UserDashboard from "@/components/pages/account/UserDashboard.vue";
import ChangePasswordPage from "@/components/pages/account/ChangePasswordPage.vue";
import ProfilePage from "@/components/pages/account/ProfilePage.vue";
import RechargePage from "@/components/pages/account/RechargePage.vue";
import PaymentHistory from "@/components/pages/account/PaymentHistoryPage.vue";


// Define router
const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/services/mail',
    name: 'MailList',
    component: MailServices
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
    path: '/user-dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    children: [
      {
        path: 'profile',
        name: 'ProfilePage',
        component: ProfilePage
      },
      {
        path: 'change-password',
        name: 'ChangePasswordPage',
        component: ChangePasswordPage
      },
      {
        path: 'recharge',
        name: 'RechargePage',
        component: RechargePage
      },
      {
        path: 'payment-history',
        name: 'PaymentHistory',
        component: PaymentHistory
      }
    ]
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