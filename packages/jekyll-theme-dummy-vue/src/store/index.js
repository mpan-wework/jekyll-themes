import Vue from 'vue';
import Vuex from 'vuex';
import site from './site';
import post from './post';
import route from './route';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    site,
    post,
    route,
  },
});
