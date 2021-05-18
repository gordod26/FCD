import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import axios from "axios";

export async function getStaticPaths() {
  //const res = await fetch(`http://localhost:5000/api/dpost/`).then(function (
  //response
  //) {
  //return response.json();
  //});
  const paths = await axios
    .get(`http://localhost:5000/api/dpost/dpostids`)
    .then(function (response) {
      return response.data; //.map((post) => {
      //return {
      //paths: {
      //id: `${post.id}`,
      //},
      //};
      //});
    });
  //const paths = res.map((post) => {
  //return {
  //params: { id: post.id.toString() },
  //};
  //});
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
  //const allPostsData = await axios
  //.get(`http://localhost:5000/api/dpost/`)
  //.then(function (response) {
  //return response.data;
  //});
  //return {
  //props: { allPostsData },
  //};
}

//export async function getStaticProps(context) {
//const id = context.params.id;
//const allPostsData = await axios
//.get(`http://localhost:5000/api/dpost/${id}`)
//.then(function (response) {
//return response.data;
//});

//return {
//props: { id: allPostsData },
//};
//}

export default function Post({ post }) {
  return (
    <Layout>
      <div>
        <h1>{post.dpost[0].title}</h1>
        <p>
          {post.dpost[0].created_at.slice(
            0,
            post.dpost[0].created_at.indexOf("T")
          )}
        </p>
        <p>{post.dpost[0].text}</p>
      </div>
    </Layout>
  );
}
