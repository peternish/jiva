import "@styles/globals.css";
import Layout from "@components/Layout";

// redux
import { Provider } from "react-redux";
import { store } from "@redux/store";

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;