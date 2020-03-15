const MUTATION = {
  SET_DOWNLOADING: 'post/setDownloading',
  SET_POST: 'post/setPost',
};

const post = {
  state: {
    downloading: false,
    post: null,
    content: '',
  },
  verbs: {
    downloading: async ({ commit }) => {
      commit({
        type: MUTATION.SET_DOWNLOADING,
        payload: { downloading: true },
      });
    },
    downloaded: async ({ commit }) => {
      commit({
        type: MUTATION.SET_DOWNLOADING,
        payload: { downloading: false },
      });
    },
    download: async ({ commit, rootState }, payload) => {
      const { post } = payload;
      if (!post.url) {
        commit({
          type: MUTATION.SET_POST,
          payload: { post },
        });
      }
      try {
        const resp = await fetch(`${rootState.site.baseurl || window.baseurl}${post.url}`);
        const content = await resp.text();
        commit({
          type: MUTATION.SET_POST,
          payload: { post, content },
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
  reducer: (state, action) => {
    switch (action.type) {
      case MUTATION.SET_POST:
        const { post, content = '' } = action.payload;
        return { ...state, post, content };
      case MUTATION.SET_DOWNLOADING:
        const { downloading } = action.payload;
        return { ...state, downloading };
      default:
        console.error(action);
        return { ...state };
    }
  },
};

export default post;
