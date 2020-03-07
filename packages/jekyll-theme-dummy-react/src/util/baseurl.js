const getBaseurl = async () => {
  const parts = window.location.pathname.split('/').filter((part) => part);
  let baseurl = window.location.origin;
  for (let i = 0, l = parts.length; i < l; i += 1) {
    try {
      const resp = await fetch(`${baseurl}/sitemap.xml`);
      if (resp.ok) {
        break;
      }
    } catch (error) {
      console.error(error);
    }
    baseurl += `/${parts[i]}`;
  }
  window.baseurl = baseurl;
};

export default getBaseurl;
