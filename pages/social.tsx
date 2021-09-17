// https://www.npmjs.com/package/ts-react-google-login-component

import Layout, { siteTitle } from '../components/layout'
import Head from 'next/head'
import LoggedIn from '../components/LoggedIn'

const SocialLoginPage = ({
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) => {
  return (
    <Layout home>
      <Head>
        <title>Social Login {siteTitle}</title>
      </Head>
      <div>
        <LoggedIn/>
      </div>
    </Layout>
  )
}

export default SocialLoginPage;
