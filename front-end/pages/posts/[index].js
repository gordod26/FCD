import { useRouter } from "next/router";
import { cmmtHelper } from "../../utils/cmmtHelper";
import CommentMap from "../../components/CommentMap";
import CommentLayout from "../../components/CommentLayout";
import Layout from "../../components/Layout";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Dhelper from "../../utils/dPostUtils";

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
  const [commentBox, setCommentBox] = useState(false);
  const [comment, setComment] = useState({
    userId: post.dpost[0].user_id,
    dpostId: post.dpost[0].id,
    path: `${post.dpost[0].id}`,
  });
  console.log("comment state:", comment);
  console.log("post prop:", post.dpost[0].id);

  const p = post.dpost[0];
  const c = cmmts;
  console.log("comment layout data", c);

  const handleSubmit = (e) => {
    setCommentBox(false);
    cmmtHelper.createCmmt(comment);
    console.log(comment);
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
    <Layout>
      <div>
        <h1>{p.title}</h1>
        <p>{p.text ? p.text : p.url}</p>
        <p>{p.created_at.slice(0, p.created_at.indexOf("T"))}</p>
        <div>
          <h3>be the first to comment!</h3>
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
              onSubmit={function () {
                if (confirm("Submit Comment?")) {
                  handleSubmit();
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
        <CommentMap cmmts={c} />
      </div>
    </Layout>
  );
}
