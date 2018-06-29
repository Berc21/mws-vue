// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import NProgress from "nprogress";

router.beforeResolve((to, from, next) => {
  if (to.path) {
    NProgress.start()
  }
  next()
});

router.afterEach(() => {
  NProgress.done()
});

Vue.config.productionTip = false;


/* eslint-disable no-new */
window.addEventListener('load' ,() => {
  new Vue({
    el: '#app',
    router,
    components: {
      App
    },
    template: '<App/>'
  })

});


