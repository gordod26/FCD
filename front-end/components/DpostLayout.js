import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getnamebyid } from "../utils/helpers";
import { useSession } from "next-auth/client";

export default NewsPostLayout;

function NewsPostLayout(props) {
  const [session, loading] = useSession();
  const [posterName, setPosterName] = useState({});

  const title = props.title;
  const url = props.url;
  const text = props.text;
  const points = props.points;
  const posterId = props.poster;
  var postDate = props.created.slice(0, props.created.indexOf("T"));

  //  console.log("DpostLayout posterid:", posterId);
  // console.log(props);

  useEffect(() => {
    getnamebyid(posterId, posterName, setPosterName);
  }, []);
  if (!session) {
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
  //LOGS VARIABLES FOR RENDERTRASH FUNCTION
  //console.log(session.user.name);
  //console.log(posterName);

  //adds trash button to post if session user also posted message

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
        <span> | {postDate} | </span>
        {session.user.name === posterName.username ? (
          <button>Trash</button>
        ) : (
          ""
        )}
      </p>
    </div>
  );
}
