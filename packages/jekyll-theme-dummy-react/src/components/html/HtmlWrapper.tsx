import React from 'react';

const HtmlWrapper = (props: any) => {
  const { html } = props;

  return (
    <div className="HtmlWrapper" dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default HtmlWrapper;
