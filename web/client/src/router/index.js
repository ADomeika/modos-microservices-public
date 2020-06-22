import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import store from '../store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/(apie|about)',
      component: () => import('@/views/About.vue')
    },
    {
      path: '/(parduotuve|shop)',
      component: () => import('@/views/Shop.vue'),
      children: [
        {
          path: ':category(vyrams|moterims|berniukams|mergaitėms|aksesuarai|men|women|boys|girls|accessories)',
          component: () => import('@/components/Categories.vue'),
          children: [
            {
              path: ':id',
              component: () => import('@/views/ItemShop.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/(salygos|terms)',
      component: () => import('@/views/Conditions.vue')
    },
    {
      path: '/(krepselis|cart)',
      component: () => import('@/views/Cart.vue')
    },
    {
      path: '/testing',
      component: () => import('@/views/Order.vue')
    },
    {
      path: '/(uzsakymas|order)',
      component: () => import('@/views/Order.vue'),
      beforeEnter: (to, from, next) => {
        if (!store.getters.cartId) {
          next('/')
        }
        next()
      }
    },
    {
      path: '/admin',
      component: () => import('@/views/admin/Dashboard')
    },
    {
      path: '/admin/(naujas-produktas|new-product)',
      component: () => import('@/views/admin/NewProduct.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/admin/(keisti-produkta|edit-product)',
      component: () => import('@/views/admin/Products.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/admin/(keisti-produkta|edit-product)/:id',
      component: () => import('@/views/admin/EditProduct.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/admin/(uzsakymai|orders)',
      component: () => import('@/views/admin/Orders.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/admin/(uzsakymai|orders)/:orderId',
      component: () => import('@/views/admin/Order.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/admin/(paveiksliukai|pictures)',
      component: () => import('@/views/admin/Pictures.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/(ispardavimas|sale)',
      component: () => import('@/views/Sale.vue')
    },
    {
      path: '/(kontaktai|contact)',
      component: () => import('@/views/Contacts.vue')
    },
    {
      path: '/(paveiksliukai|pictures)',
      component: () => import('@/views/Pictures.vue')
    },
    {
      path: '/(pasidarykpats|makeyourown)',
      component: () => import('@/views/MakeYourOwn.vue')
    },
    {
      path: '/(uzsakyta|success)',
      component: () => import('@/views/Success.vue')
    },
    {
      path: '**',
      redirect: '/'
    }
  ]
})
