import React, { useMemo } from 'react';
import useMount from 'react-use/lib/useMount';
import { Link } from 'react-router-dom';
import { useStore } from '../store';

const Home = () => {
  const { state, dispatch } = useStore();
  const posts = useMemo(() => state.site?.posts || [], [state.site]);

  useMount(async () => {
    dispatch({ type: 'site/load' });
    dispatch({ type: 'post/downloading' });
  });

  return (
    <div className="home">
      <ul>
        {posts.map((post) => (
          <li key={post.url}>
            <Link
              to={{
                pathname: post.url,
                state: {
                  post,
                },
              }}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
