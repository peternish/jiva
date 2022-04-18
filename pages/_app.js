import "@styles/globals.css";
import { useEffect } from "react"
import Head from 'next/head'

// redux
import { Provider } from "react-redux";
import { store } from "@redux/store";
import { isLoggedIn as isLoggedInSelector } from "@redux/modules/auth/selectors"

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const isLoggedIn = isLoggedInSelector(store.getState())
  const publicRoutes = [ /^\/login$/, /^\/$/, /^\/register$/, /^\/form.*$/ ]
    const isPublicRoute = publicRoutes.some(rx => rx.test(location.pathname))
    console.log(location.pathname)
    if (!isPublicRoute && !isLoggedIn) {
      location.assign("/login")
    }
  })
  
  return (
    <Provider store={store}>
      <Head>
        <meta name="description" content="Jiva" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
