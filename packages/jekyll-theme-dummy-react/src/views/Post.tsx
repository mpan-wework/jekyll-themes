import React, { useCallback, useMemo, FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';
import useMount from 'react-use/lib/useMount';
import { useStore } from '../store';
import HtmlWrapper from '../components/html/HtmlWrapper';
import Comment from '../components/post/Comment';
import useCanvasFavIcon from '../util/useCanvasFavIcon';

type LocationState = {
  post: Object;
};

const Post: FunctionComponent = ({ children }) => {
  const { state, dispatch } = useStore();
  const location = useLocation<LocationState>();

  const load = useCallback(async () => {
    await dispatch({ type: 'site/load' });
    await dispatch({ type: 'post/downloading' });
    await dispatch({
      type: 'post/download',
      payload: {
        post: location.state?.post || {
          url: location.pathname,
        },
      },
    });
    await dispatch({ type: 'post/downloaded' });
  }, [location.state, location.pathname, dispatch]);

  useMount(() => {
    load();
  });

  const content = useMemo(() => {
    if (state.post.content) {
      const el = document.createElement('div');
      el.innerHTML = state.post.content;
      const outerHTML = el.getElementsByTagName('main')[0]?.outerHTML || '';
      el.remove();
      return outerHTML;
    }

    return '';
  }, [state.post.content]);

  const draw = useCallback((ctx) => {
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, 16, 16);
  }, []);

  useCanvasFavIcon({ width: 16, height: 16, draw });

  if (state.post.downloading) {
    return <div>Downloading</div>;
  }

  return (
    <div>
      <HtmlWrapper html={content || children} />
      <Comment />
    </div>
  );
};

export default Post;
