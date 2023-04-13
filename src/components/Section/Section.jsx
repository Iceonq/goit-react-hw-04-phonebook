import React from 'react';

const Section = ({ title, object }) => {
  return (
    <>
      <h1>{title}</h1>
      <div>{object}</div>
    </>
  );
};

export default Section;
