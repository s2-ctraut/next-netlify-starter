import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GetStaticProps } from 'next';

import Link from 'next/link';


import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import App from '../components/App';

const reactClient = new QueryClient();

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
export default function Home({
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  return (
    <QueryClientProvider client={reactClient}>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <Link href="page2"><a>Page 2</a></Link>
        <hr />
        <App />
      </Layout>
    </QueryClientProvider>
  )
}