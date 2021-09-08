import Layout, { siteTitle } from '../components/layout'
import Head from 'next/head'
import { GoogleLoginButton } from 'ts-react-google-login-component';


export default function Login({
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
    const clientConfig = { client_id: '261377444261-5ovk2irequohduu8eddis19l5ofvfl53.apps.googleusercontent.com' };
    const signInOptions = { scope: 'profile' };
  return (
      <Layout home>
        <Head>
          <title>Login {siteTitle}</title>
        </Head>
    <div>
            <GoogleLoginButton
                  responseHandler={this.responseGoogle}
                  clientConfig={clientConfig}
                  singInOptions={signInOptions} ></GoogleLoginButton>
    </div>
      </Layout>
  )
}
