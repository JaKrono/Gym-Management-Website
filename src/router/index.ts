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
      path: '/coach-profile',
      name: 'Coach Profile',
      component: CoachProfileComponentVue
    },
    {
      path: '/search-coach',
      name: 'Search Coach',
      component: SearchCoachComponentVue
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
