import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/pages/Home.vue";
import Single from "@/pages/Single.vue";

Vue.use(Router)

export default new Router({
  base: __dirname,
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      props: true 
    },
    {
      path: '/restaurant/:id',
      name: 'Single',
      component: Single,
      props: true 
    }
  ],

})
