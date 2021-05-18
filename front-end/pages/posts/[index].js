import { useRouter } from "next/router";
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
  const id = context.params.index;
  const res = await fetch(`http://localhost:5000/api/dpost/${id}`).then(
    function (response) {
      return response.json();
    }
  );
  return {
    props: { post: res },
  };
}

export default function Post({ post }) {
  const [commentBox, setCommentBox] = useState(false);
  const [comment, setComment] = useState("");

  const p = post.dpost[0];

  const handleSubmit = (e) => {
    setCommentBox(false);
    Dhelper.createDpost(post);
    //console.log(post);
    //e.preventDefault();
    //setPost({
    //...post,
    //title: "",
    //url: "",
    //text: "",
    //});
  };

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setComment({
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
          {!commentBox ? (
            <button
              onClick={function () {
                setCommentBox(true);
              }}
            >
              comment
            </button>
          ) : (
            <form
              onSubmit={function () {
                if (confirm("Submit Comment?")) {
                  handleSubmit();
                }
              }}
            >
              <textarea
                id="text"
                name="text"
                value={comment.text}
                onChange={handleInputChange}
              />
              <br />
              <input type="submit" value="Submit" />
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}
