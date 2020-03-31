const renderCanvasFavIcon = (props) => {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = props.width;
    canvas.height = props.height;
    const ctx = canvas.getContext('2d');

    if (ctx === null) {
      console.error('Failed to create canvas');
      canvas.remove();
      return;
    }

    props.draw(ctx);

    let favicon = document.querySelector('link[rel=icon]');
    if (favicon === null) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
    }
    favicon.href = canvas.toDataURL('image/png');
    canvas.remove();
  } catch (error) {
    console.error(error);
  }
};

export default renderCanvasFavIcon;
