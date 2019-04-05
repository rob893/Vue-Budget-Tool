import Vue from 'vue'
import App from './App.vue'
import FundamentalVue from 'fundamental-vue';

Vue.use(FundamentalVue);

new Vue({
  el: '#app',
  render: h => h(App)
})
