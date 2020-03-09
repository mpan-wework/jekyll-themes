const MUTATION = {
  SET_POST: 'setPost',
};

export default {
  namespaced: true,
  state: {
    post: null,
    content: '',
  },
  actions: {
    download: async ({ commit, rootState }, payload) => {
      const { post } = payload;
      if (!post.url) {
        commit(MUTATION.SET_POST, { post });
      } else {
        try {
          const resp = await fetch(`${rootState.site.baseurl}${post.url}`);
          const content = await resp.text();
          commit(MUTATION.SET_POST, { post, content });
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
  mutations: {
    [MUTATION.SET_POST]: (state, payload) => {
      state.post = payload.post || {};
      state.content = payload.content || '';
    },
  },
};
