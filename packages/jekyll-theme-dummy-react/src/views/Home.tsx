import React, { useMemo, useCallback } from 'react';
import useMount from 'react-use/lib/useMount';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import useCanvasFavIcon from '../util/useCanvasFavIcon';

type Post = {
  url: string;
  title: string;
};

const Home = () => {
  const { state, dispatch } = useStore();
  const posts = useMemo(() => state.site?.posts || [], [state.site]);

  useMount(async () => {
    dispatch({ type: 'site/load' });
    dispatch({ type: 'post/downloading' });
  });

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(0, 0, 16, 16);
  }, []);

  useCanvasFavIcon({ width: 16, height: 16, draw });

  return (
    <div className="home">
      <ul>
        {posts.map((post: Post) => (
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
