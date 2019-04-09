import Vue from 'vue';
import App from './App.vue';
import FundamentalVue from 'fundamental-vue';

Vue.config.productionTip = false;

Vue.use(FundamentalVue);

new Vue({
    render: (h) => h(App),
}).$mount('#app');
