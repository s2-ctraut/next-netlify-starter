import React from 'react';
import App from '../components/App';
import { QueryClient, QueryClientProvider } from 'react-query';


import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import { GetStaticProps } from 'next'

const client = new QueryClient();

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
    <QueryClientProvider client={client}>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <App />
      </Layout>
    </QueryClientProvider>
  )
}