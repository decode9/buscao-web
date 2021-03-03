import { FC, useEffect } from 'react'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useStore } from 'react-redux'
import { wrapper } from '../store'
import { Loader } from '../components';
import '../../public/styles/globals.scss';
import Head from 'next/head';

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  const store = useStore()
  const router = useRouter()

  useEffect(() => {
    if(router.route == '/') localStorage.clear()
    store.__persistor.persist()
  }, [])

  return (
    <>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Component {...pageProps} />
    <Loader />
    </>
  )
}

export default wrapper.withRedux(WrappedApp)
