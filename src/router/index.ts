import CoachSearch from '@/views/CoachSearch.vue'
import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CoachProfileComponentVue from '@/components/CoachProfileComponent.vue';
import SearchCoachComponentVue from '@/components/SearchCoachComponent.vue';
import store from '@/store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {},
      component: LoginView
    },
    {
      path: '/coach-search',
      name: 'coach-search',
      components: {
        default: () => import("@/views/CoachSearch.vue"),
        RightSidebar: () => import("@/components/Sidebar.vue")
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { requireAuth: true },
      components: {
        default: () => {
          if (store.state.user.role == '2') {
            return import('@/views/Customer/CustomerHome.vue')
          } else if (store.state.user.role == '1') {
            return import('@/views/Coach/CoachHome.vue')

          } else if (store.state.user.role == '0') {
            return import("@/views/Profile.vue")
          }
        },
        RightSidebar: () => import("@/components/Sidebar.vue")
      }
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { requireAuth: true },
      components: {
        default: () => {
          if (store.state.user.role == '2') {
            return import('@/views/Customer/CustomerProfile.vue')
          } else if (store.state.user.role == '1') {
            return import('@/views/Coach/CoachProfile.vue')
          } else if (store.state.user.role == '0') {
            return import('@/views/CGymProfile.vue')
          }
        },
        RightSidebar: () => import('@/components/Sidebar.vue')
      }
    },
    {
      path: '/gyms',
      name: 'gyms',
      meta: { requireAuth: true },
      components: {
        default: () => {
          if (store.state.user.role == '2') {
            return import('@/views/Customer/CustomerGyms.vue')
          } else if (store.state.user.role == '1') {
            return import('@/views/Coach/CoachGyms.vue')
          } else if (store.state.user.role == '0') {
            // return import()
          }
        },
        RightSidebar: () => import('@/components/Sidebar.vue')
      }
    },
    {
      path: '/coaches',
      name: 'coaches',
      components: {
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
      components: {
        default: () => import("@/components/SearchCoachComponent.vue"),
        RightSidebar: () => import("@/components/Sidebar.vue")
      }
    },
    {
      path: '/classes',
      name: 'classes',
      meta: { requireAuth: true },
      components: {
        default: () => {
          if (store.state.user.role == '2') {
            // customer classes
          }
          if (store.state.user.role == '1') {
            return import('@/views/Coach/CoachClasses.vue')
          }
          if (store.state.user.role == '0') {
            // import("@/views/Customers.vue")
          }
        },
        RightSidebar: () => import("@/components/Sidebar.vue")
      }
    },
    {
      path: '/customers',
      name: 'customers',
      meta: { requireAuth: true },
      components: {
        default: () => {
          if (store.state.user.role == '2') {
            // 
          }
          if (store.state.user.role == '1') {
            return import('@/views/Coach/CoachCustomers.vue')
          }
          if (store.state.user.role == '0') {
            return import("@/views/Customers.vue")
          }
        },
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
      path: '/articles',
      name: 'Articles',
      meta: { requireAuth: true },
      components: {
        default: () => import("@/views/Articles.vue"),
        RightSidebar: () => import("@/components/Sidebar.vue")
      }
    },
    {
      path: '/view-article',
      name: 'View Article',
      meta: { requireAuth: true },
      components: {
        default: () => import("@/components/Article/ArticleViewComponent.vue"),
        RightSidebar: () => import("@/components/Sidebar.vue")
      }
    },
    {
      path: '/explore',
      name: 'Explore',
      components: {
        default: () => import("@/components/ExploreComponent.vue"),
        RightSidebar: () => import("@/components/Sidebar.vue")
      }
    },
    {
      path: '/questions',
      name: 'Q&A',
      meta: { requireAuth: true },
      components: {
        default: () => import("@/views/Q_A/Questions.vue"),
        RightSidebar: () => import("@/components/Sidebar.vue")
      }
    },
    {
      path: '/coach-posts',
      name: 'Coach Posts',
      components: {
        default: () => import("@/components/CoachPostsComponent.vue"),
        RightSidebar: () => import("@/components/Sidebar.vue")
      }
    },
    {
      path: '/questions/:id(\\d+)',
      name: 'View Question',
      meta: { requireAuth: true },
      components: {
        default: () => import("@/components/Q_A/ViewQuestionComponent.vue"),
        RightSidebar: () => import("@/components/Sidebar.vue")
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
router.beforeEach((to, from, next) => {
  if (to.meta['requireAuth'] && !store.state.user.isSignedIn) {
    next('/login')
  }
  else {
    next()
  }
})
export default router
