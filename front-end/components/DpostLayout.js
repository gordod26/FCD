import React, { useState, useEffect } from "react";
import Link from "next/link";
import Dhelper from "../utils/dPostUtils";
import { getnamebyid } from "../utils/helpers";

export default NewsPostLayout;

function NewsPostLayout(props) {
  let title = props.title;
  let url = props.url;
  let text = props.text;
  let points = props.points;
  const posterId = props.poster;
  const [posterName, setPosterName] = useState({});
  console.log(posterId);

  //// This state will eventually need to be passed this info from a form page.
  //const [postInfo, setPostInfo] = useState({
  //title: "The C. S. Lewis Collection: Essays and Speeches",
  //url: "www.cslewis.com/",
  //points: "0",
  //user: "gordod26",
  //numComments: "0",
  //}
  //{
  //title: "The C. S. Lewis Collection: Essays and Speeches",
  //url: "www.cslewis.com/",
  //points: "0",
  //user: "gordod26",
  //numComments: "0",
  //}{
  //title: "The C. S. Lewis Collection: Essays and Speeches",
  //url: "www.cslewis.com/",
  //points: "0",
  //user: "gordod26",
  //numComments: "0",
  //} );
  ////const [postInfo, setPostInfo] = useState({
  ////title: "",
  ////url: "",
  ////points: "",
  ////user: "",
  ////});

  useEffect(() => {
    getnamebyid(posterId, posterName, setPosterName);
  }, []);
  return (
    <div style={{ border: "1px solid grey" }}>
      {/* WAITING TO ADD RANK, MAY BE ABLE TO DO OUTSIDE OF STATE IN <li>
      <span>{postInfo.rank} </span>
      */}
      <button>Upvote</button>
      <p>
        <a href={url}>{title} </a>
        <sub>
          <a href={url}>({url})</a>
        </sub>
      </p>
      <p>
        {points} Pts by {posterName.username} | hide | {/*numComments*/}{" "}
        <Link href="/comments">
          <a>comments</a>
        </Link>
      </p>
    </div>
  );
}
