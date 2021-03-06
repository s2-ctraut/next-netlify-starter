import Layout, { siteTitle } from '../components/layout'
import Head from 'next/head'
import { GoogleUserProfile } from '../components/GoogleUserProfile'

export default function LoginPage({
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>Login {siteTitle}</title>
      </Head>
      <div>
        <GoogleUserProfile/>
      </div>
    </Layout>
  )
}
