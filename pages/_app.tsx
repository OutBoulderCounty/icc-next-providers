import "../styles/globals.css"
import type { AppProps } from "next/app"
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>ICC Provider Dashboard</title>
        <meta
          name="description"
          content="Dashboard for Inclusive Care CO providers"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
