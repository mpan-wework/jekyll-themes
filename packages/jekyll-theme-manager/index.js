const createManager = () => {
  const _themes = [];
  let _current = null;

  const _validate = (theme = {}) => {
    if (!theme.key) {
      console.error('theme key not found');
      return false;
    }
    if (!theme.npm) {
      console.error('theme npm not found');
      return false;
    }
    if (!theme.css) {
      console.error('theme css not found');
      return false;
    }
    if (!theme.js) {
      console.error('theme js not found');
      return false;
    }
    return true;
  };

  const load = (themes = []) => {
    for (let i = 0, l = themes.length; i < l; i += 1) {
      const theme = themes[i];
      if (_validate(theme)) {
        const exist = _themes.find((t) => t.key === theme.key);
        if (exist) {
          const last = _themes.pop();
          if (_themes.length > 1) {
            Object.keys(last).forEach((key) => {
              exist[key] = last[key];
            });
          }
        }
        _themes.push(theme);
      }
    }
  };

  const use = (key) => {
    const theme = _themes.find((t) => t.key === key);
    if (!theme) {
      return;
    }

    const rootEl = document.getElementById('root');
    const postEl = document.getElementById('post');
    if (rootEl && postEl) {
      postEl.parentNode.removeChild(postEl);
      while (rootEl.lastChild) {
        rootEl.removeChild(rootEl.lastChild);
      }
      rootEl.appendChild(postEl);
    }

    const headEl = document.querySelector('head');
    if (_current) {
      const jsEl = document.getElementById('theme-js');
      jsEl.parentNode.removeChild(jsEl);
    } else {
      const cssEl = document.createElement('link');
      cssEl.id = 'theme-css';
      cssEl.rel = 'stylesheet';
      headEl.appendChild(cssEl);
    }
    _current = theme;

    document.getElementById('theme-css').href = `${theme.npm}/${theme.css}`;
    const newJsEl = document.createElement('script');
    newJsEl.id = 'theme-js';
    newJsEl.src = `${theme.npm}/${theme.js}`;
    headEl.appendChild(newJsEl);
  };

  return {
    load,
    use,
  };
};

const JekyllThemeManager = createManager();
export default JekyllThemeManager;
