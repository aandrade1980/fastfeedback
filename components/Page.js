import React from 'react';
import { NextSeo } from 'next-seo';

const Page = ({ name, children }) => {
  const title = `Fast Feedback – ${name}`;

  return (
    <>
      <NextSeo
        title={title}
        openGraph={{
          title
        }}
      />
      {children}
    </>
  );
};

export default Page;
