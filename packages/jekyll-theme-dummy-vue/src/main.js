import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

window.VUE_APP_VERSION = process.env.VUE_APP_VERSION;

Vue.config.productionTip = false;
Vue.config.devtools = true;

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
