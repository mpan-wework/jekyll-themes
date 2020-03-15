const MUTATION = {
  REFRESH_BASEURL: 'site/refreshBaseurl',
  SET_POSTS: 'site/setPosts',
  SET_DISQUS: 'site/setDisqus',
};

export default {
  state: {
    baseurl: null,
    posts: [],
    disqus: null,
  },
  verbs: {
    load: async ({ commit }) => {
      commit({ type: MUTATION.REFRESH_BASEURL });
      try {
        const resp = await fetch(`${window.baseurl}/site.json`);
        const site = await resp.json();
        if (site?.posts) {
          commit({
            type: MUTATION.SET_POSTS,
            payload: { posts: site.posts },
          });
        }
        if (site?.disqus) {
          commit({
            type: MUTATION.SET_DISQUS,
            payload: { disqus: site.disqus },
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  reducer: (state, action) => {
    switch (action.type) {
      case MUTATION.REFRESH_BASEURL:
        const baseurl = window.baseurl;
        return { ...state, baseurl };
      case MUTATION.SET_POSTS:
        const { posts } = action.payload;
        return { ...state, posts };
      case MUTATION.SET_DISQUS:
        const { disqus } = action.payload;
        return { ...state, disqus };
      default:
        console.error(action);
        return { ...state };
    }
  },
};
