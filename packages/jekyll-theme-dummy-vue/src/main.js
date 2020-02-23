import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Promise.resolve().then(async () => {
  const postEl = document.getElementById('post');
  const vm = new Vue({
    router,
    store,
    render: (h) => h(App, {}, [postEl.innerHTML]),
  });
  vm.$mount(postEl.parentElement);
});
