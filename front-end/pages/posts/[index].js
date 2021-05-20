import { cmmtHelper } from "../../utils/cmmtHelper";
import CommentMap from "../../components/CommentMap";
import Layout from "../../components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import Head from "next/head";
import { useSession } from "next-auth/client";

export async function getStaticPaths() {
  const paths = await axios
    .get(`http://localhost:5000/api/dpost/dpostids`)
    .then(function (response) {
      return response.data;
    });
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps(context) {
  const postId = context.params.index;
  const postRes = await fetch(`http://localhost:5000/api/dpost/${postId}`).then(
    function (response) {
      return response.json();
    }
  );
  const cmmtRes = await axios
    .get(`http://localhost:5000/api/comments/dpost/${postId}`)
    .then(function (response) {
      return response.data;
    });

  return {
    props: {
      post: postRes,
      cmmts: cmmtRes,
    },
  };
}

export default function Post({ post, cmmts }) {
  const [session, loading] = useSession();
  const [commentBox, setCommentBox] = useState(false);
  const [comment, setComment] = useState({
    userId: post.dpost[0].user_id,
    dpostId: post.dpost[0].id,
    path: `${post.dpost[0].id}`,
  });
  console.log("SESSIONPROPS:", session);
  //console.log("comment state:", comment);
  //console.log("post prop:", post.dpost[0].id);

  const p = post.dpost[0];
  const c = cmmts;
  //console.log("comment layout data", c);

  const handleSubmit = (e) => {
    setCommentBox(false);
    cmmtHelper.createCmmt(comment);
    console.log(comment);
    e.preventDefault();
    window.location.reload();
    setComment({
      ...comment,
      cmmt: "",
    });
  };

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setComment({
      ...comment,
      [name]: value,
    });
  };

  return (
    <>
      <Head>
        {/*metadata*/}
        <title>Fellowship Of Christion Developers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div>
          <h1>{p.title}</h1>
          <p>{p.text ? p.text : p.url}</p>
          <p>{p.created_at.slice(0, p.created_at.indexOf("T"))}</p>
          <div>
            {!commentBox ? (
              <div>
                <button
                  onClick={function () {
                    setCommentBox(true);
                  }}
                >
                  Comment
                </button>
              </div>
            ) : (
              <form
                onSubmit={function (e) {
                  if (confirm("Submit Comment?")) {
                    handleSubmit(e);
                  }
                }}
              >
                <textarea
                  id="cmmt"
                  name="cmmt"
                  value={comment.text}
                  onChange={handleInputChange}
                />
                <br />
                <input type="submit" value="Submit" />
              </form>
            )}
          </div>
          <CommentMap post={post} cmmts={c} session={session} />
        </div>
      </Layout>
    </>
  );
}
