import CoachSearch from '@/views/CoachSearch.vue'
import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CoachProfileComponentVue from '@/components/CoachProfileComponent.vue';
import SearchCoachComponentVue from '@/components/SearchCoachComponent.vue';

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
    {
      path: '/coach-profile',
      name: 'Coach Profile',
      component: CoachProfileComponentVue
    },
    {
      path: '/search-coach',
      name: 'Search Coach',
      components:{
        default: () => import("@/components/SearchCoachComponent.vue"),
        RightSidebar: () => import("@/components/Sidebar.vue")
      }
    },
    {
      path: '/club-classes',
      name: 'Club Classes',
      components: {
        default: () => import("@/components/ClassesComponent.vue"),
        RightSidebar: () => import("@/components/Sidebar.vue")
      }
    },
    {
      path: '/chome',
      name: 'Customer Home',
      components: {
        default: () => import("@/views/CHome.vue"),
        RightSidebar: () => import("@/components/Sidebar.vue")
      }
    },
    {
      path: '/cprofile',
      name: 'Customer Profile',
      components: {
        default: () => import("@/views/CProfile.vue"),
        RightSidebar: () => import("@/components/Sidebar.vue")
      }
    },
    {
      path: '/cgyms',
      name: 'Customer Gyms',
      components: {
        default: () => import("@/views/CGyms.vue"),
        RightSidebar: () => import("@/components/Sidebar.vue")
      }
    },
    {
      path: '/cgymprofile',
      name: 'Gym Profile',
      components: {
        default: () => import("@/views/CGymProfile.vue"),
        // RightSidebar: () => import("@/components/Sidebar.vue")
      }
    }
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
