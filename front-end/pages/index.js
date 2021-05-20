import Head from "next/head";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Login from "../components/Login";
import DpostLayout from "../components/DpostLayout";
import DpostMap from "../components/DpostMap";
import Dhelper from "../utils/dPostUtils";
import axios from "axios";

export async function getStaticProps() {
  const res = await fetch("http://localhost:5000/api/dpost/").then(function (
    response
  ) {
    return response.json();
  });
  return {
    props: { post: res },
  };
  //const allPostsData = await axios
  //.get(`http://localhost:5000/api/dpost/`)
  //.then(function (response) {
  //return response.data;
  //});
  //return {
  //props: { allPostsData },
  //};
}
export default function Home({ post }) {
  //Authentication session w/ next-auth
  const [posts, setPosts] = useState(post);
  console.log("Dposts returned to /pages/index", posts);

  //useEffect(() => {
  //Dhelper.getDposts(setPosts);
  //}, []);

  //useEffect(() => {
  //Dhelper.getDataForStatic();
  //}, []);

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

// This works when I put axios directly in function but not importing it
