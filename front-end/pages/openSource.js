import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import DpostMap from "../components/DpostMap";
import Dhelper from "../utils/dPostUtils";
import { useSession } from "next-auth/client";
import { Pagination, Select } from "@geist-ui/react";

export async function getStaticProps() {
  // ..the/fetch/path/ends/with/'startup'/sorting/param
  const res = await fetch(
    "http://localhost:5000/api/dpost/sort/votes/project"
  ).then(function (response) {
    return response.json();
  });
  return {
    props: { post: res },
  };
}

export default function Home({ post }) {
  //Authentication session w/ next-auth
  const [sortMethod, setSortMethod] = useState({
    sortMethod: "votes",
    postType: "project",
  });
  const [posts, setPosts] = useState(post);
  const [session, loading] = useSession();
  //console.log("Dposts returned to /pages/index", posts);

  const selectorHandler = (e) => {
    setSortMethod({
      ...sortMethod,
      sortMethod: e,
    });
  };
  /////////////////////////////////////////////////////////////////////////////
  // SORTING LOGIC ////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    Dhelper.getSortedPosts(
      sortMethod.sortMethod,
      sortMethod.postType,
      setPosts
    );
  }, [sortMethod]);
  return (
    <>
      <Head>
        {/*metadata*/}
        <title>Fellowship Of Christion Developers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h2>Projects</h2>
        <Select
          placeholder="Sort By..."
          value={sortMethod.sortMethod}
          onChange={selectorHandler}
          style={{ marginBottom: "20px" }}
        >
          <Select.Option value="votes">votes</Select.Option>
          <Select.Option value="new">new</Select.Option>
        </Select>
        <DpostMap posts={posts} session={session} />
        <Pagination />
      </Layout>
    </>
  );
}
