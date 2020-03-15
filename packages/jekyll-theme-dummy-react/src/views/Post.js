import React, { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import useMount from 'react-use/lib/useMount';
import useToggle from 'react-use/lib/useToggle';
import Disqus from 'disqus-react';
import { useStore } from '../store';
import HtmlWrapper from '../components/html/HtmlWrapper';

const Post = ({ children }) => {
  const { state, dispatch } = useStore();
  const [commentOn, toggleComment] = useToggle(false);
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

  const disqus = useMemo(() => {
    if (!commentOn) {
      return {};
    }

    const shortname = state.site.disqus;
    const identifier = location.pathname.replace(/[^a-zA-Z0-9]/g, '');
    const url = `${state.site.baseurl}${location.pathname}`;
    return {
      shortname,
      identifier: `id${identifier}`,
      title: `title${identifier}`,
      url,
    };
  }, [commentOn, location.pathname, state.site]);

  if (state.post.downloading) {
    return <div>Downloading</div>;
  }

  return (
    <div>
      <HtmlWrapper html={content || children} />
      <input type="checkbox" value={commentOn} onChange={toggleComment} />
      {disqus.shortname && (
        <Disqus.DiscussionEmbed
          shortname={disqus.shortname}
          config={{
            identifier: disqus.identifier,
            title: disqus.title,
            url: disqus.url,
          }}
        />
      )}
    </div>
  );
};

export default Post;
