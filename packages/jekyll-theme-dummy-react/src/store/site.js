const MUTATION = {
  REFRESH_BASEURL: 'site/refreshBaseurl',
  SET_POSTS: 'site/setPosts',
};

export default {
  state: {
    baseurl: null,
    posts: [],
  },
  storeActions: {
    load: async ({ state, commit }, payload) => {
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
      default:
        console.error(action);
        return { ...state };
    }
  },
};
