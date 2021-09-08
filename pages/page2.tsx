import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GetStaticProps } from 'next'

import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import CtExperiment from '../components/CtExperiment';

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
          <title>page 2 {siteTitle}</title>
        </Head>
        <CtExperiment />
        <hr />
      </Layout>
    </QueryClientProvider>
  )
}