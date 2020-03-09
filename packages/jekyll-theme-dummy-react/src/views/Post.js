import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useStore } from '../store';
import HtmlWrapper from '../components/html/HtmlWrapper';

const Post = ({ children }) => {
  const { state, dispatch } = useStore();
  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      dispatch({
        type: 'post/download',
        payload: {
          post: location.state.post,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  if (!location.state) {
    return <HtmlWrapper html={children} />;
  }

  return <HtmlWrapper html={state.post.content} />;
};

export default Post;
