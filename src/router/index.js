import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { requiresAuth: true },
    component: HomeView
  },
  {
    path: '/login',
    name: 'Inicio de Sesión',
    meta: { requiresAuth: false },
    component: LoginView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (to.path != '/login' && isAuthenticated()) {
      next();
    }
    else {
      localStorage.removeItem('tokenTec');
      router.push({ path: '/login' })
    }
  } else {
    next()
  }
})

function isAuthenticated() {
  let isAuth = JSON.parse(localStorage.getItem('tokenTec'));
  if (isAuth === null) {
    return false
  }
  else {
    return true
  }
}

export default router
