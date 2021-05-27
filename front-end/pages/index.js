import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import DpostMap from "../components/DpostMap";
import Dhelper from "../utils/dPostUtils";
import { useSession } from "next-auth/client";

export async function getStaticProps() {
  // ..the/fetch/path/ends/with/'startup'/sorting/param
  const res = await fetch("http://localhost:5000/api/dpost/sort/votes").then(
    function (response) {
      return response.json();
    }
  );
  return {
    props: { post: res },
  };
}

export default function Home({ post }) {
  //Authentication session w/ next-auth
  const [sortMethod, setSortMethod] = useState("votes");
  const [posts, setPosts] = useState(post);
  const [session, loading] = useSession();
  //console.log("Dposts returned to /pages/index", posts);

  /////////////////////////////////////////////////////////////////////////////
  // SORTING LOGIC ////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    Dhelper.getSortedPosts(sortMethod, setPosts);
  }, [sortMethod]);
  return (
    <>
      <Head>
        {/*metadata*/}
        <title>Fellowship Of Christion Developers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>Discussion</h1>
        <button
          onClick={function () {
            setSortMethod("new");
          }}
        >
          new
        </button>
        <button
          onClick={function () {
            setSortMethod("votes");
          }}
        >
          votes
        </button>
        <DpostMap posts={posts} session={session} />
      </Layout>
    </>
  );
}
