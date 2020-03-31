const MUTATION = {
  REFRESH_BASEURL: 'refreshBaseurl',
  SET_POSTS: 'setPosts',
  SET_DISQUS: 'setDisqus',
  SET_GITHUB: 'setGithub',
};

export default {
  namespaced: true,
  state: {
    baseurl: null,
    posts: [],
    disqus: null,
    github: null,
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
        if (site?.github) {
          commit(MUTATION.SET_GITHUB, { github: site.github });
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
    [MUTATION.SET_GITHUB]: (state, { github }) => {
      try {
        const [owner, repo] = github.repository_nwo.split('/');
        state.github = { owner, repo };
      } catch (error) {
        console.error(MUTATION.SET_GITHUB);
      }
    },
  },
};
