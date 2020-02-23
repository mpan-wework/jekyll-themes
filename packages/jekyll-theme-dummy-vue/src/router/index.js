import Vue from 'vue';
import VueRouter from 'vue-router';
import Post from '../views/Post.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    component: Post,
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
