import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import { StoreProvider } from '../store';
import RouterView from '../router/RouterView';
import NavSide from './navigation/NavSide';
import NavTop from './navigation/NavTop';
import styles from './App.module.scss';

class App extends React.Component {
  render() {
    return (
      <StoreProvider>
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
                <RouterView {...this.props} />
              </div>
            </div>
          </div>
        </Router>
      </StoreProvider>
    );
  }
}

export default App;
