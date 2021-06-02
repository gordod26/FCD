import "../styles/globals.css";
import { Provider } from "next-auth/client";
import { GeistProvider, CssBaseline } from "@geist-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <GeistProvider>
      <Provider session={pageProps.session}>
        <CssBaseline /> {/* ---> Normalize styles */}
        <Component {...pageProps} />
      </Provider>
    </GeistProvider>
  );
}

export default MyApp;
