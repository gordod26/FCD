import Head from "next/head";
import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Login from "../components/Login";
import NewsPostLayout from "../components/NewsPostLayout";

export default function Home() {
  //Authentication session w/ next-auth
  return (
    <>
      <Head>
        {/*metadata*/}
        <title>Fellowship Of Christion Developers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>Discussion</h1>
        <NewsPostLayout />
      </Layout>
    </>
  );
}
