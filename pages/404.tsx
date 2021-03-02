import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 stránka sa nenašla</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>{' '}
      <div>404 page not found</div>
    </>
  );
};

export default Custom404;
