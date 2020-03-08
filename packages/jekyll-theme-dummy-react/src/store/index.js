import createStore from './createStore';
import site from './site';

const modules = {
  site,
};

const { StoreProvider, useStore } = createStore(modules);

export { StoreProvider, useStore };
