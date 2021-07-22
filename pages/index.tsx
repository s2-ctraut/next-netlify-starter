import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import App from '../components/App';
import { QueryClient, QueryClientProvider } from 'react-query';


import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'

const client = new QueryClient();


// ReactDOM.render(
//   <QueryClientProvider client={client}>
//     <App />
//   </QueryClientProvider>,
//   document.getElementById('root')
// );

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
      { process.browser && <App /> }
      </Layout>
   </QueryClientProvider>
  )
}