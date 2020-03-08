import React, { useMemo } from 'react';
import useMount from 'react-use/lib/useMount';
import { useStore } from '../store';

const Home = () => {
  const { state, dispatch } = useStore();
  const posts = useMemo(() => state.site?.posts || [], [state.site]);

  useMount(async () => dispatch({ type: 'site/load' }));

  return (
    <div className="home">
      <ul>
        {posts.map((post) => (
          <li key={post.url}>
            <a href={post.url}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
