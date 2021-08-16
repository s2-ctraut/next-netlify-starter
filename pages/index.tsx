import React from 'react';
import App from '../components/App';
import CtExperiment from '../components/CtExperiment';
import { QueryClient, QueryClientProvider } from 'react-query';
// import ApolloClient from "apollo-boost";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";


import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import { GetStaticProps } from 'next'

const reactClient = new QueryClient();

const apolloClient = new ApolloClient({
  uri: "/.netlify/functions/graphql",
  // uri: "https://48p1r2roz4.sse.codesandbox.io",
  cache: new InMemoryCache()
});

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
        <ApolloProvider client={apolloClient}>
          <Layout home>
            <Head>
              <title>{siteTitle}</title>
            </Head>
            <CtExperiment />
            <hr />
            <App />
          </Layout>
      </ApolloProvider>
    </QueryClientProvider>
  )
}