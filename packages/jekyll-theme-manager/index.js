const createManager = () => {
  const _themes = window.themes || [];

  const use = (key) => {
    const theme = _themes.find((t) => t.key === key);
    if (!theme) {
      return;
    }

    const rootEl = document.getElementById('root');
    const postEl = document.getElementById('post');
    if (rootEl && postEl) {
      while (rootEl.lastChild) {
        rootEl.removeChild(rootEl.lastChild);
      }
      rootEl.appendChild(postEl);
    }

    document.getElementById('theme-css').href = `${theme.npm}/${theme.css}`;

    const jsEl = document.getElementById('theme-js');
    const jsParent = jsEl.parentNode;
    jsParent.removeChild(jsEl);
    const newJsEl = document.createElement('script');
    newJsEl.id = 'theme-js';
    newJsEl.src = `${theme.npm}/${theme.js}`;
    jsParent.appendChild(newJsEl);
  };

  return {
    use,
  };
};

const JekyllThemeManager = createManager();
export default JekyllThemeManager;
