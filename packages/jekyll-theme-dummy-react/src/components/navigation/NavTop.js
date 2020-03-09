import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useStore } from '../../store';
import styles from './NavTop.module.scss';

const NavTop = () => {
  const location = useLocation();
  const { state } = useStore();
  const title = useMemo(() => {
    if (location.pathname === '/') {
      return '';
    } else if (location.pathname.startsWith('/posts/')) {
      return state.post.post?.title || '';
    }
    return '';
  }, [location, state.post]);

  return <div className={styles.NavTop}>{title}</div>;
};

export default NavTop;
