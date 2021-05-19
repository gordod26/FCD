import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/client";
import Dhelper from "../utils/dPostUtils";

export default NewsPostLayout;

function NewsPostLayout(props) {
  const [session, loading] = useSession();
  const [posterName, setPosterName] = useState(props.name);

  const title = props.title;
  const url = props.url;
  const text = props.text;
  const points = props.points;
  const posterId = props.poster;
  const id = props.id;
  var postDate = props.created.slice(0, props.created.indexOf("T"));
  const handleDelete = () => {
    Dhelper.deleteDpost(id);
  };

  //  console.log("DpostLayout posterid:", posterId);
  // console.log(props);

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
          {points} Pts by {posterName} | hide | {/*numComments*/}{" "}
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
      {/*<button>Upvote</button>*/}
      {url ? (
        <p>
          <a href={url}>{title} </a>
          <sub>
            <a href={url}>({url})</a>
          </sub>
        </p>
      ) : (
        <p>
          <Link href={`/posts/${id}`}>
            <a>{title} </a>
          </Link>
          <sub>(text)</sub>
        </p>
      )}
      <p>
        {/*{points} Pts */}By {posterName} {/*| hide*/} | {/*numComments*/}{" "}
        <Link href={`/posts/${id}`}>
          <a>comments</a>
        </Link>
        <span> | {postDate} </span>
      </p>
      {session.user.name === posterName ? (
        <form
          onSubmit={function () {
            if (confirm("Delete Post Permanently?")) {
              handleDelete();
            }
          }}
        >
          <input type="submit" value="Trash" />
        </form>
      ) : (
        ""
      )}
    </div>
  );
}
