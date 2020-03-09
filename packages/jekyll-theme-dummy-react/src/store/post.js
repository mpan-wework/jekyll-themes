const MUTATION = {
  SET_POST: 'post/setPost',
};

export default {
  state: {
    post: null,
    content: '',
  },
  verbs: {
    download: async ({ commit }, payload) => {
      const { post } = payload;
      if (!post.url) {
        commit({
          type: MUTATION.SET_POST,
          payload: { post },
        });
      }
      try {
        const resp = await fetch(post.url);
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
      default:
        console.error(action);
        return { ...state };
    }
  },
};
