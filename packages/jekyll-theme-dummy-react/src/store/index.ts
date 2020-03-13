import createStore from '@mpan-wework/react-store';
import site from './site';
import post from './post';

const modules: any = {
  site,
  post,
};

const { StoreProvider, useStore } = createStore(modules, true);

export { StoreProvider, useStore };
