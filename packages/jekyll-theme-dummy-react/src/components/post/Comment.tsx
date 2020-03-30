import React, { useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Disqus from 'disqus-react';
import { useStore } from '../../store';
import styles from './Comment.module.scss';

type Mode = 'none' | 'disqus';

const Comment = () => {
  const { state } = useStore();
  const location = useLocation();
  const [mode, setMode] = useState<Mode>('none');

  const onModeChange = useCallback((value) => () => {
    setMode(value)
  }, []);

  const disqus = useMemo(() => {
    if (mode !== 'disqus') {
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
  }, [mode, location.pathname, state.site]);

  return (
    <div className={styles.Comment}>
      <div className={styles.mode}>
        {['none', 'disqus'].map((value) => (
          <span key={value}>
            <input
              type="radio"
              value={value}
              checked={value === mode}
              onChange={onModeChange(value)}
            />
            <label>{value}</label>
          </span>
        ))}
      </div>
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
