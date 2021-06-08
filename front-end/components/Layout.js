import Head from "next/head";
import Header from "./Header";
import { Page, Text } from "@geist-ui/react";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <script src="psl.min.js" />
        <link rel="icon" href="/crossed-swords.svg" />
      </Head>
      <Page dotBackdrop size="mini">
        <Page.Header>
          <Header />
        </Page.Header>
        <main>{children}</main>
      </Page>
    </div>
  );
}
