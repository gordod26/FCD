import { useRouter, getStaticPaths } from "next/router";
import Layout from "../../components/Layout";
import Dhelper from "../../../utils/dPostUtils";

//export async function getStaticProps() {
//const allPostIds = Dhelper.getPostIds()();
//return {
//props: {
//allPostIds,
//},
//};
//}

//export async function getStaticProps({ params }) {
//const postData = Dhelper.getPostData(params.id)
//return {
//props: {
//postData
//}
//}

export default function Post({ allPostsData }) {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <Layout>
      <div>
        <p>does the page work</p>
        {/*<sub>Post: {pid}</sub>
        <h1>{pid.title}</h1>
        <p>{pid.text} </p>*/}
      </div>
    </Layout>
  );
}
export async function getStaticPaths() {
  const res = await fetch("http://localhost:5000/api/dpost");
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3000/page/${params.id}`);
  const post = await res.json();

  return { props: { post } };
}
