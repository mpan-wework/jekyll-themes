import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

Promise.resolve().then(async () => {
  const postOuterHTML = document.getElementById('post').outerHTML;
  const rootEl = document.getElementById('root');
  ReactDOM.render(<App>{postOuterHTML}</App>, rootEl);

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
});
