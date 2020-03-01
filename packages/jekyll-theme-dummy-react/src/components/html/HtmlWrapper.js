import React from 'react';

const HtmlWrapper = ({ html }) => {
  return (
    <div
      className="HtmlWrapper"
      dangerouslySetInnerHTML={{__html: html }}
    />
  );
};

export default HtmlWrapper;
