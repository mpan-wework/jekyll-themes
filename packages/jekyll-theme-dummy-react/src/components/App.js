import React from 'react';
import NavSide from './navigation/NavSide';
import NavTop from './navigation/NavTop';
import styles from './App.module.scss';

const App = ({ children }) => {
  return (
    <div className={styles.App}>
      <div className={styles.navSide}>
        <NavSide />
      </div>
      <div className={styles.container}>
        <div className={styles.navTop}>
          <NavTop />
        </div>
        <div className={styles.content} dangerouslySetInnerHTML={{__html: children}} />
      </div>
    </div>
  );
}

export default App;
