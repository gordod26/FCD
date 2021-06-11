import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { signIn } from "next-auth/client";
import Head from "next/head";
import Layout from "../components/Layout";
import PostForm from "../components/PostForm";
import { getidbyemail } from "../utils/helpers";
import Dhelper from "../utils/dPostUtils";
import DpostMap from "../components/DpostMap";
import { Divider, Card } from "@geist-ui/react";

//export async function getStaticProps() {
//// ..the/fetch/path/ends/with/'startup'/sorting/param
//const res = await fetch("http://localhost:5000/api/dpost/sort/new").then(
//function (response) {
//return response.json();
//}
//);
//return {
//props: { post: res },
//};
//}

export default function SubmitNewsPost({ post }) {
  const [session, loading] = useSession();
  const [userPosts, setUserPosts] = useState();
  const [userId, setUserId] = useState("");
  //const [content, setContent] = useState();

  //useEffect(() => {
  //const fetchData = async () => {
  //const res = await fetch("/api/secret/");
  //const json = await res.json();

  //if (json.content) {
  //setContent(json.content);
  //}
  //};
  //fetchData();
  //}, [session]);

  // if page hasn't rendered don't display anything

  //if (typeof window !== "undefined" && loading) return null;
  if (!session) {
    return (
      <Layout>
        <Head>
          <title>Share Error Page</title>
        </Head>
        <main>
          <div>
            <h1>You aren't signed in, please sign in first</h1>
            <button onClick={signIn}>Sign in</button>
          </div>
        </main>
      </Layout>
    );
  }

  //Dhelper.getUserPosts(userId, setUserPosts);
  if (!userId) {
    console.log("gettting userId");
    getidbyemail(session.user.email, userId, setUserId);
  } else if (userId && !userPosts) {
    console.log("user ID is", userId.userId);
    Dhelper.getUserPosts(userId.userId, setUserPosts);
  } else if (userId && userPosts) {
  }

  return (
    <Layout>
      <Head>
        {/*metadata*/}
        <title>Fellowship Of Christion Developers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <PostForm />
          <p>
            Leave URL blank to submit a question for discussion. If there is no
            URL, the text (if any) will appear at the top of the thread.
          </p>
        </div>
        <Divider />
        <h2>My Post History</h2>
        <div>
          <DpostMap posts={userPosts} session={session} />
        </div>
      </main>
    </Layout>
  );
}
