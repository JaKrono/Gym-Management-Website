import CoachSearch from '@/views/CoachSearch.vue'
import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path:'/coach-search',
      name:'coach-search',
      components:{
        default: () => import("@/views/CoachSearch.vue"),
        RightSidebar: () => import("@/components/Sidebar.vue")
      }
    },
    {
      path:'/dashboard',
      name:'dashboard',
      components:{
        default: () => import("@/views/Profile.vue"),
        RightSidebar: () => import("@/components/Sidebar.vue")
      }
    },
    {
      path:'/coaches',
      name:'coaches',
      components:{
        default: () => import("@/views/Coaches.vue"),
        RightSidebar: () => import("@/components/Sidebar.vue")
      }
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
