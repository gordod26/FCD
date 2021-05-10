import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { signIn } from "next-auth/client";
import Head from "next/head";
import Layout from "../components/Layout";
import PostForm from "../components/PostForm";

export default function SubmitNewsPost() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/secret/");
      const json = await res.json();

      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);

  // if page hasn't rendered don't display anything
  if (typeof window !== "undefined" && loading) return null;

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

  return (
    <Layout>
      <Head>
        <title>Discussion</title>
      </Head>
      <main>
        <div>
          <PostForm />
          <p>
            Leave url blank to submit a question for discussion. If there is no
            url, the text (if any) will appear at the top of the thread.
          </p>
        </div>
      </main>
    </Layout>
  );
}
