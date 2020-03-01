import React from 'react';
import HtmlWrapper from '../components/html/HtmlWrapper';

const Post = ({ children }) => {
  return <HtmlWrapper html={children} />;
};

export default Post;
