import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useStore } from '../store';
import HtmlWrapper from '../components/html/HtmlWrapper';

const Post = ({ children }) => {
  const { state, dispatch } = useStore();
  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      dispatch({ type: 'post/downloading' })
        .then(() =>
          dispatch({
            type: 'post/download',
            payload: {
              post: location.state.post,
            },
          }),
        )
        .then(() => dispatch({ type: 'post/downloaded' }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

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

  if (!location.state) {
    return <HtmlWrapper html={children} />;
  }

  return <HtmlWrapper html={content} />;
};

export default Post;
