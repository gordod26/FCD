import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import DpostMap from "../components/DpostMap";
import Dhelper from "../utils/dPostUtils";
import { useSession } from "next-auth/client";
import { Pagination, Select } from "@geist-ui/react";
import axios from "axios";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const paths = await axios
    .get(`http://localhost:5000/api/dpost/count/discussion`)
    .then(function (response) {
      return response.data;
    });
  // Get the paths we want to pre-render based on posts
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const pageNum = params.index;
  // ..the/fetch/path/ends/with/'startup'/sorting/param
  const res = await fetch(
    `http://localhost:5000/api/dpost/sort/votes/discussion/${pageNum}`
  ).then(function (response) {
    return response.json();
  });
  const res2 = await fetch(
    "http://localhost:5000/api/dpost/count/discussion"
  ).then(function (response) {
    return response.json();
  });
  return {
    props: { post: res, numPages: res2 },
  };
}

export default function Home({ post, numPages }) {
  //Authentication session w/ next-auth
  const [sortMethod, setSortMethod] = useState({
    sortMethod: "votes",
    postType: "discussion",
    page: 1,
  });
  const [posts, setPosts] = useState();
  const [session, loading] = useSession();
  //console.log("Dposts returned to /pages/index", posts);
  //
  const selectorHandler = (e) => {
    setSortMethod({
      ...sortMethod,
      sortMethod: e,
    });
  };
  const pageHandler = (e) => {
    router.push(`./${e}`);
  };
  const workingNumPages = numPages.length;
  console.log("res2", workingNumPages);
  const router = useRouter();

  /////////////////////////////////////////////////////////////////////////////
  // SORTING LOGIC ////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    Dhelper.getSortedPosts(
      sortMethod.sortMethod,
      sortMethod.page,
      sortMethod.postType,
      setPosts
    );
  }, [sortMethod]);
  useEffect(() => {
    setPosts(post), [];
  });
  return (
    <>
      <Head>
        {/*metadata*/}
        <title>Fellowship Of Christion Developers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Select
          placeholder="Sort By..."
          value={sortMethod.sortMethod}
          onChange={selectorHandler}
          style={{ marginBottom: "20px" }}
        >
          <Select.Option value="votes">votes</Select.Option>
          <Select.Option value="new">new</Select.Option>
        </Select>
        <DpostMap posts={post} session={session} />
        <Pagination count={workingNumPages} limit={5} onChange={pageHandler} />
      </Layout>
    </>
  );
}
