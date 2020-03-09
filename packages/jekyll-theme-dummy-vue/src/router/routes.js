import Home from '../views/Home';
import NotFound from '../views/NotFound';
import Post from '../views/Post';

const rawRoutes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/posts/:post(.+)',
    component: Post,
    props: (route) => ({
      post: route.params?.postData,
    }),
  },
  {
    path: '*',
    component: NotFound,
  },
];

const routes = rawRoutes.map((route) => ({
  props: true,
  ...route,
}));

export default routes;
