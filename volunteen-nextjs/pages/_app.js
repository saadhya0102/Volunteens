import '@/styles/globals.css'
import Navbar from "./Navbar";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
      <>
          <Head>
                <title>VolunTeen</title>
          </Head>
          <Navbar />
          <Component {...pageProps} />
      </>
  )
}
