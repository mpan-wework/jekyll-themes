import React, { useCallback, useMemo } from 'react';
import useMount from 'react-use/lib/useMount';
import { useStore } from '../store';

const Home = () => {
  const { state, dispatch } = useStore();
  const posts = useMemo(() => state.site?.posts || [], [state.site]);

  useMount(async () => dispatch({ type: 'site/load' }));

  const postUrl = useCallback(
    (post) => {
      if (state.site?.baseurl) {
        return `${state.site.baseurl}${post.url}`;
      }
      return post.url;
    },
    [state.site],
  );

  return (
    <div className="home">
      <ul>
        {posts.map((post) => (
          <li key={post.url}>
            <a href={postUrl(post)}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
