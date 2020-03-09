import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavSide.module.scss';

const NavSide = () => {
  return (
    <div className={styles.NavSide}>
      <Link
        to={{ pathname: '/' }}
      >
        Home
      </Link>
    </div>
  );
};

export default NavSide;
