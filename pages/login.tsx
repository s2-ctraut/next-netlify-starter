// https://www.npmjs.com/package/ts-react-google-login-component

import Layout, { siteTitle } from '../components/layout'
import Head from 'next/head'
import { Login } from '../components/Login'

function responseGoogle(googleUser: gapi.auth2.GoogleUser): void {
    const id_token = googleUser.getAuthResponse(true).id_token
    const googleId = googleUser.getId()

    console.log({ googleId })
    console.log({accessToken: id_token})
    // Make user login in your system
    // login success tracking...
};


export default function LoginPage({
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
    // const clientConfig = { client_id: '261377444261-5ovk2irequohduu8eddis19l5ofvfl53.apps.googleusercontent.com' };
    // const signInOptions = { scope: 'profile' };
  return (
      <Layout home>
        <Head>
          <title>Login {siteTitle}</title>
        </Head>
    <div>
            <Login/>
    </div>
      </Layout>
  )
}
