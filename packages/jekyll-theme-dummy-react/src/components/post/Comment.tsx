import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import useToggle from 'react-use/lib/useToggle';
import Disqus from 'disqus-react';
import { useStore } from '../../store';

const Comment = () => {
  const { state } = useStore();
  const location = useLocation();
  const [commentOn, toggleComment] = useToggle(false);

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

  return (
    <div className="Comment">
      <input
        type="checkbox"
        value={Number(commentOn)}
        onChange={toggleComment}
      />
      {disqus.shortname && (
        <Disqus.DiscussionEmbed
          shortname={disqus.shortname}
          config={{
            identifier: disqus.identifier || '',
            title: disqus.title || '',
            url: disqus.url || '',
          }}
        />
      )}
    </div>
  );
};

export default Comment;
