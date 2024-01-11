import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Forgotpassword from '../views/Forgotpassword.vue';
import AdminDashboard from '../views/admin/Dashboard.vue';
import AdminProfile from '../views/admin/AdminProfile.vue';
import EmployeeDashboard from '../views/employee/Dashboard.vue';
import EmployeeProfile from '../views/employee/EmployeeProfile.vue';
import EmployeeFormView from '../views/employee/FormView.vue';
import { decrypt } from '../functions';

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
        const localData = JSON.parse(decrypt(localStorage.getItem('user_info')));
        if(!localData) next('/');
        localData.user_type != 1 ? next('/employee/dashboard') : next();
      }
    },
    {
      path: '/admin/profile',
      name: 'AdminProfile',
      component: AdminProfile,
      beforeEnter: (to, from, next) => {
        const localData = JSON.parse(decrypt(localStorage.getItem('user_info')));
        if(!localData) next('/');
        localData.user_type != 1 ? next('/employee/dashboard') : next();
      }
    },
    {
      path: '/employee/dashboard',
      name: 'EmployeeDashboard',
      component: EmployeeDashboard,
      beforeEnter: (to, from, next) => {
        const localData = JSON.parse(decrypt(localStorage.getItem('user_info')));
        if(!localData) next('/');
        localData.user_type != 0 ? next('/admin/dashboard') : next();
      }
    },
    {
      path: '/employee/profile',
      name: 'EmployeeProfile',
      component: EmployeeProfile,
      beforeEnter: (to, from, next) => {
        const localData = JSON.parse(decrypt(localStorage.getItem('user_info')));
        if(!localData) next('/');
        localData.user_type != 0 ? next('/admin/dashboard') : next();
      }
    },
    {
      path: '/employee/form',
      name: 'EmployeeFormView',
      component: EmployeeFormView,
      beforeEnter: (to, from, next) => {
        const localData = JSON.parse(decrypt(localStorage.getItem('user_info')));
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
