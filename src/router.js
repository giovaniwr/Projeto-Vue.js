// Requiring module
import Vue from 'vue'
import VueRouter from 'vue-router'
import CadastroHome from '../views/CadastroHome.vue'
  
Vue.use(VueRouter)
  
export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
    
        component:()=> import(
            '../views/CadastroAbout.vue')
        }
    ]
  })