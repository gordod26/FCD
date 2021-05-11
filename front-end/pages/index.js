import Head from "next/head";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Login from "../components/Login";
import DpostLayout from "../components/DpostLayout";
import DpostMap from "../components/DpostMap";
import Dhelper from "../utils/dPostUtils";

export default function Home() {
  //Authentication session w/ next-auth
  const [posts, setPosts] = useState();

  useEffect(() => {
    Dhelper.getDposts(setPosts);
  }, []);

  return (
    <>
      <Head>
        {/*metadata*/}
        <title>Fellowship Of Christion Developers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>Discussion</h1>
        <DpostMap posts={posts} />
      </Layout>
    </>
  );
}
