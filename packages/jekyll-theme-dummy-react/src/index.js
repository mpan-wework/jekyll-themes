import React, { createRef } from 'react';
import ReactDOM from 'react-dom';
import { createHashHistory } from 'history';
import getBaseurl from './util/baseurl';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

window.REACT_APP_VERSION = process.env.REACT_APP_VERSION;

Promise.resolve()
  .then(getBaseurl)
  .then(async () => {
    const postEl = document.getElementById('post');
    const rootEl = document.getElementById('root');
    const rct = createRef();
    ReactDOM.render(
      <App ref={rct}>{postEl ? postEl.outerHTML : ''}</App>,
      rootEl,
    );
    window.$react = rct;
    window.$history = createHashHistory();

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
  });
