const MUTATION = {
  REFRESH_BASEURL: 'refreshBaseurl',
  SET_POSTS: 'setPosts',
};

export default {
  namespaced: true,
  state: {
    baseurl: null,
    posts: [],
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
  },
};
