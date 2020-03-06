import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, _, next) => {
  const urlMatch = new RegExp(/\/posts\/[^?#]+$/).exec(
    window.location.pathname
  );
  const routeMatch = new RegExp(/\/posts\/[^?#]+$/).exec(to.path);
  if (to.path === '/') {
    if (urlMatch) {
      next(urlMatch[0])
    }
  } else if (routeMatch) {
    if (urlMatch) {
      // /posts/xxx#/posts/xxx => /#/posts/xxx
      const url =
        window.location.origin +
        window.location.pathname.replace(urlMatch, '') +
        window.location.search +
        window.location.hash;
      window.history.replaceState(null, null, url);
      next();
    }
  }
  next();
});

export default router;
