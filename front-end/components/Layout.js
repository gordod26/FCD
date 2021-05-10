import Head from "next/head";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/crossed-swords.svg" />
      </Head>
      <Header />
      <main>{children}</main>
    </div>
  );
}
