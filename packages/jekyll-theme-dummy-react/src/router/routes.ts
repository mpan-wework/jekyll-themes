import Home from '../views/Home';
import NotFound from '../views/NotFound';
import Post from '../views/Post';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/posts/:post',
    component: Post,
  },
  {
    path: '*',
    component: NotFound,
  },
];

export default routes;
