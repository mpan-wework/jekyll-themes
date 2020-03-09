import createStore from '@mpan-wework/react-store';
import site from './site';

const modules = {
  site,
};

const { StoreProvider, useStore } = createStore(modules, true);

export { StoreProvider, useStore };
