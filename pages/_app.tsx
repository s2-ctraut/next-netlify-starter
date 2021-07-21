import '../styles/global.css'
import { AppProps } from 'next/app'

// global CSS imports
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
