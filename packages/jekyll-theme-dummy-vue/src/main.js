import Vue from 'vue';
import getBaseurl from './util/baseurl';
import App from './App.vue';
import router from './router';
import store from './store';
import '@primer/css/index.scss';
import '@primer/css/markdown/index.scss';

window.VUE_APP_VERSION = process.env.VUE_APP_VERSION;

Vue.config.productionTip = false;
Vue.config.devtools = true;

Promise.resolve()
  .then(getBaseurl)
  .then(async () => {
    const postEl = document.getElementById('post');
    const rootEl = document.getElementById('root');
    const vm = new Vue({
      router,
      store,
      render: (h) =>
        h('div', { attrs: { id: 'root' } }, [h(App, {}, [postEl?.outerHTML])]),
    });
    vm.$mount(rootEl);
    window.$vm = vm;
  });
