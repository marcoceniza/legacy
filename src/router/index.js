import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Forgotpassword from '../views/Forgotpassword.vue';
import AdminDashboard from '../views/admin/Dashboard.vue';
import AdminProfile from '../views/admin/Profile.vue';
import Dashboard from '../views/user/Dashboard.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/forgot-password',
      name: 'Forgotpassword',
      component: Forgotpassword
    },
    {
      path: '/admin/dashboard',
      name: 'AdminDashboard',
      component: AdminDashboard,
      beforeEnter: (to, from, next) => {
        let localData = JSON.parse(localStorage.getItem('user_info'));
        if(!localData) next('/');
        localData.user_type != 1 ? next('/user/dashboard') : next();
      }
    },
    {
      path: '/admin/profile',
      name: 'AdminProfile',
      component: AdminProfile,
      beforeEnter: (to, from, next) => {
        let localData = JSON.parse(localStorage.getItem('user_info'));
        if(!localData) next('/');
        localData.user_type != 1 ? next('/user/dashboard') : next();
      }
    },
    {
      path: '/user/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        let localData = JSON.parse(localStorage.getItem('user_info'));
        if(!localData) next('/');
        localData.user_type != 0 ? next('/admin/dashboard') : next();
      }
    },
    {
      path:'/404',
      name:'ErrorPage',
      component: ()=> import('@/views/404.vue')
    }
  ]
})

export default router
