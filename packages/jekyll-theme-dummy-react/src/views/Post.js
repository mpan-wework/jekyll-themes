import React, { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import useMount from 'react-use/lib/useMount';
import { useStore } from '../store';
import HtmlWrapper from '../components/html/HtmlWrapper';

const Post = ({ children }) => {
  const { state, dispatch } = useStore();
  const location = useLocation();

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

  if (state.post.downloading) {
    return <div>Downloading</div>;
  }

  return <HtmlWrapper html={content || children} />;
};

export default Post;
