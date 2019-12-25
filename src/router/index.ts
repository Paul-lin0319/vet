import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';

import Login from '@/views/Login/index.vue';
import Layout from '@/views/Layout/index.vue';
import Home from '@/views/Home/index.vue';
import Page404 from '@/views/404/index.vue';
import system from './system';

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        meta: { title: '首页' },
        component: Home
      },
      ...system,
      {
        path: '404',
        name: '404',
        meta: { title: '404' },
        component: Page404
      }
    ]
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '*',
    name: 'notFound',
    redirect: '/404'
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to, from);
  const userId = localStorage.getItem('userId');
  if (to.path === '/login') {
    if (userId) {
      next('/home');
      return;
    } else {
      next();
      return;
    }
  }
  if (!userId) {
    next('/login');
    return;
  }
  store.dispatch('addIncludeList', {
    name: to.path,
    title: to.meta.title,
    closable: to.path !== '/home'
  });
  next();
})

export default router
