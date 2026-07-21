import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/login',
      component: () => import('../layouts/AuthLayout.vue'),
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('../views/LoginView.vue'),
          meta: { title: 'Login | ForgeX Core' },
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
          meta: { title: 'Dashboard | ForgeX Core' },
        },
        {
          path: 'finance',
          name: 'finance-overview',
          component: () => import('../views/finance/FinanceOverviewView.vue'),
          meta: { title: 'Finance Overview | ForgeX Core' },
        },
        {
          path: 'finance/revenue',
          name: 'revenue',
          component: () => import('../views/finance/RevenueView.vue'),
          meta: { title: 'Revenue | ForgeX Core' },
        },
        {
          path: 'finance/expenses',
          name: 'expenses',
          component: () => import('../views/finance/ExpensesView.vue'),
          meta: { title: 'Expenses | ForgeX Core' },
        },
        {
          path: 'finance/invoices',
          name: 'invoices',
          component: () => import('../views/finance/InvoicesView.vue'),
          meta: { title: 'Invoices | ForgeX Core' },
        },
        {
          path: 'finance/reports',
          name: 'reports',
          component: () => import('../views/finance/ReportsView.vue'),
          meta: { title: 'Reports | ForgeX Core' },
        },
        {
          path: 'projects',
          name: 'projects',
          component: () => import('../views/projects/ProjectsView.vue'),
          meta: { title: 'Projects | ForgeX Core' },
        },
        {
          path: 'clients',
          name: 'clients',
          component: () => import('../views/clients/ClientsView.vue'),
          meta: { title: 'Clients | ForgeX Core' },
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/ProfileView.vue'),
          meta: { title: 'Profile | ForgeX Core' },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: { title: 'Page Not Found | ForgeX Core' },
    },
  ],

  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const isAuthenticated =
    sessionStorage.getItem('forgex-authenticated') === 'true'

  const requiresAuth = to.matched.some(
    (route) => route.meta.requiresAuth,
  )

  if (requiresAuth && !isAuthenticated) {
    return { name: 'login' }
  }

  if (to.name === 'login' && isAuthenticated) {
    return { name: 'dashboard' }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title || 'ForgeX Core'
})

export default router