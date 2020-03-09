const REPLACE = 'replace';

export default {
  namespaced: true,
  state: {
    props: {},
  },
  actions: {
    [REPLACE]: ({ commit }, props) => {
      commit(REPLACE, props);
    },
  },
  mutations: {
    [REPLACE]: (state, props) => {
      state.props = props || {};
    },
  },
};
