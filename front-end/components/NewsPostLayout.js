import React, { useState } from "react";
import Link from "next/link";

export default NewsPostLayout;

function NewsPostLayout() {
  // This state will eventually need to be passed this info from a form page.
  const [postInfo, setPostInfo] = useState({
    rank: "1",
    title: "The C. S. Lewis Collection: Essays and Speeches",
    url: "www.cslewis.com/",
    points: "0",
    user: "gordod26",
    numComments: "0",
  });

  return (
    <div style={{ border: "1px solid grey" }}>
      <span>{postInfo.rank} </span>
      <button>Upvote</button>
      <p>
        <a href={postInfo.url}>{postInfo.title} </a>
        <sub>
          <a href={postInfo.url}>({postInfo.url})</a>
        </sub>
      </p>
      <p>
        {postInfo.points} Pts by {postInfo.user} | hide | {postInfo.numComments}{" "}
        <Link href="/comments">
          <a>comments</a>
        </Link>
      </p>
    </div>
  );
}
