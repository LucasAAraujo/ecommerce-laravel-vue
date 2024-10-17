import {createRouter, createWebHistory} from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import ResetPassword from "../views/ResetPassword.vue";
import RequestPassword from "../views/RequestPassword.vue";
import AppLayout from "../components/AppLayout.vue";
import Products from "../components/Products.vue";
import store from "../store";

const routes = [
  {
    path: '/app',
    name: 'app',
    component: AppLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'dashboard',
        name: 'app.dashboard',
        component: Dashboard
      },
      {
        path: 'products',
        name: 'app.products',
        component: Products
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashborad',
    component : Dashboard
  },
  {
    path: '/login',
    name: 'login',
    component : Login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/reset-password',
    name: 'resetPassword',
    component : ResetPassword,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/request-password',
    name: 'requestPassword',
    component : RequestPassword,
    meta: {
      requiresGuest: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({name: 'login'})
  } else if (to.meta.requiresGuest && store.state.user.token) {
    next({name: 'app.dashboard'})
  } else {
    next();
  }
})

export default router;