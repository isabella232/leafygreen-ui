import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Global } from '@emotion/core';
import { globalStyles } from 'styles/globals';
import BaseLayout from 'layouts/BaseLayout';
import ComponentLayout from 'layouts/ComponentLayout';

function DefaultLayout({ children }) {
  return children;
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const layout = router.pathname.split('/').filter(substr => !!substr)[0];

  let SubLayout: React.FunctionComponent;

  switch (layout) {
    case 'component':
      SubLayout = ComponentLayout;
      break;

    default:
      SubLayout = DefaultLayout;
  }

  return (
    <LeafyGreenProvider>
      <Head>
        <title>Home – LeafyGreen Design System | MongoDB</title>
        <meta
          name="description"
          content="MongoDB's open-source, accessible design system for designing and building web applications with React."
        />

        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="generator" content="LeafyGreen UI" />

        <meta
          property="og:title"
          content="LeafyGreen - MongoDB Design System"
        />
        <meta
          property="og:site_name"
          content="LeafyGreen - MongoDB Design System"
        />
        <meta property="og:url" content="https://mongodb.design" />
        <meta
          property="og:description"
          content="MongoDB's open-source, accessible design system for designing and building web applications with React."
        />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Global styles={globalStyles} />
      <BaseLayout>
        <SubLayout>
          <Component {...pageProps} />
        </SubLayout>
      </BaseLayout>
    </LeafyGreenProvider>
  );
}

export default MyApp;
