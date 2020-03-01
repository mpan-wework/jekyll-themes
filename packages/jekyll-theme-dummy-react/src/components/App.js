import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import RouterView from  '../router/RouterView';
import NavSide from './navigation/NavSide';
import NavTop from './navigation/NavTop';
import styles from './App.module.scss';

const App = (props) => {
  return (
    <Router>
      <div className={styles.App}>
        <div className={styles.navSide}>
          <NavSide />
        </div>
        <div className={styles.container}>
          <div className={styles.navTop}>
            <NavTop />
          </div>
          <div className={styles.content}>
            <RouterView {...props} />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
