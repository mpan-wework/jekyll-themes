const MUTATION = {
  SET_DOWNLOADING: 'setDownloading',
  SET_POST: 'setPost',
};

export default {
  namespaced: true,
  state: {
    downloading: false,
    post: null,
    content: '',
  },
  actions: {
    downloading: async ({ commit }) => {
      commit(MUTATION.SET_DOWNLOADING, { downloading: true });
    },
    downloaded: async ({ commit }) => {
      commit(MUTATION.SET_DOWNLOADING, { downloading: false });
    },
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
    [MUTATION.SET_DOWNLOADING]: (state, payload) => {
      state.downloading = payload.downloading;
    },
  },
};
