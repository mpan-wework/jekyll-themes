import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Promise.resolve().then(async () => {
  const postOuterHTML = document.getElementById('post').outerHTML;
  const rootEl = document.getElementById('root');
  const vm = new Vue({
    router,
    store,
    render: (h) =>
      h('div', { attrs: { id: 'root' } }, [h(App, {}, [postOuterHTML])]),
  });
  vm.$mount(rootEl);
});
