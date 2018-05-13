// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import 'lib-flexible'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import axios from './axios'

// import fastclick from 'fastclick'
// fastclick.attach(document.body)
Vue.prototype.$axios = axios;

Vue.use(MintUI);

// main.js
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})