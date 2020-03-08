// https://react.christmas/2019/7

import React, { createContext, useContext, useReducer } from 'react';
import site from './site';

const modules = {
  site,
};

const initialArg = Object.keys(modules).reduce(
  (state, key) => ({ ...state, [key]: modules[key].state }),
  {},
);

const reducer = (state, action) => {
  const { type } = action;
  if (!type || typeof type !== 'string') {
    console.error(action);
    return state;
  }

  const [actionModule] = action.type.split('/');
  const moduleReducer = modules[actionModule]?.reducer;
  if (!moduleReducer) {
    console.error(action);
    return state;
  }

  const newModuleState = moduleReducer(state[actionModule], action);
  return {
    ...state,
    [actionModule]: {
      ...state[actionModule],
      ...newModuleState,
    },
  };
};

const storeWrap = (state, commit) => async (storeAction) => {
  const { type, payload } = storeAction;
  if (!type || typeof type !== 'string') {
    console.error(storeAction);
    return null;
  }

  const [storeModule, storeActionName] = type.split('/');
  const moduleStoreAction =
    modules[storeModule]?.storeActions?.[storeActionName];
  if (!moduleStoreAction) {
    console.error(storeAction);
    return null;
  }

  console.debug('dispatch', storeAction);
  return moduleStoreAction(
    {
      state: state[storeModule],
      rootState: state,
      commit,
    },
    payload,
  );
};

const StoreContext = createContext({ state: initialArg });

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialArg);

  return (
    <StoreContext.Provider
      value={{
        state,
        dispatch: storeWrap(state, dispatch),
        commit: dispatch,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => useContext(StoreContext);

export { StoreProvider, useStore };
