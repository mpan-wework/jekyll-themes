const MUTATION = {
  REFRESH_BASEURL: 'refreshBaseurl',
  SET_POSTS: 'setPosts',
  SET_DISQUS: 'setDisqus',
};

export default {
  namespaced: true,
  state: {
    baseurl: null,
    posts: [],
    disqus: null,
  },
  actions: {
    load: async ({ commit, state }) => {
      commit(MUTATION.REFRESH_BASEURL);
      try {
        const resp = await fetch(`${state.baseurl}/site.json`);
        const site = await resp.json();
        if (site?.posts) {
          commit(MUTATION.SET_POSTS, { posts: site.posts });
        }
        if (site?.disqus) {
          commit(MUTATION.SET_DISQUS, { disqus: site.disqus });
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  mutations: {
    [MUTATION.REFRESH_BASEURL]: (state) => {
      state.baseurl = window.baseurl;
    },
    [MUTATION.SET_POSTS]: (state, { posts }) => {
      state.posts = posts;
    },
    [MUTATION.SET_DISQUS]: (state, { disqus }) => {
      state.disqus = disqus;
    },
  },
};
