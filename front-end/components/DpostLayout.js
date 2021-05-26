import React, { useState, useEffect } from "react";
import Link from "next/link";
import Dhelper from "../utils/dPostUtils";
import { getidbyemail } from "../utils/helpers";
import {
  postVote,
  getVote,
  deleteVote,
  updateVoteCount,
} from "../utils/voteHelpers";

export default NewsPostLayout;

function NewsPostLayout(props) {
  /////////////////////////////////////////////////////////////////////////////
  // STATES ///////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  const [posterName, setPosterName] = useState(props.name);
  const [voteState, setVoteState] = useState({
    voteDisplay: props.votes,
    postId: props.id,
    userId: "",
  });
  /////////////////////////////////////////////////////////////////////////////
  // VARS /////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  const title = props.title;
  const url = props.url;
  let votes = props.votes;
  const id = props.id;
  var postDate = props.created.slice(0, props.created.indexOf("T"));
  /////////////////////////////////////////////////////////////////////////////
  // HANDLERS /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  const handleVote = () => {
    if (voteState.didVote) {
      deleteVote(voteState.userId, voteState.postId);
      setVoteState({
        ...voteState,
        didVote: !voteState.didVote,
        voteDisplay: voteState.voteDisplay - 1,
      });
    } else {
      postVote(voteState.userId, voteState.postId);
      setVoteState({
        ...voteState,
        didVote: !voteState.didVote,
        voteDisplay: voteState.voteDisplay + 1,
      });
    }
  };

  /////////////////////////////////////////////////////////////////////////////
  const handleDelete = () => {
    Dhelper.deleteDpost(id);
  };
  /////////////////////////////////////////////////////////////////////////////
  // console.log("DpostLayout posterid:", posterId);
  // console.log(props);
  /////////////////////////////////////////////////////////////////////////////
  // USEEFFECT HOOK ///////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (props.session) {
      getidbyemail(props.session.user.email, voteState, setVoteState);
    }
  }, [props.session]);
  //checks if user voted on this post yet sets didVote to t/f?/////////////////
  useEffect(() => {
    if (voteState.userId) {
      getVote(voteState.userId, voteState.postId, voteState, setVoteState);
    }
  }, [voteState.userId]);
  /////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    updateVoteCount(props.id);
  }, []);

  if (!props.session) {
    ///////////////////////////////////////////////////////////////////////////
    // LOGGED OUT RETURN ...///////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    return (
      <div style={{ border: "1px solid grey" }}>
        {/* WAITING TO ADD RANK, MAY BE ABLE TO DO OUTSIDE OF STATE IN <li>
      <span>{postInfo.rank} </span>
      */}
        <button>+1</button>
        <p>
          <a href={url}>{title} </a>
          <sub>
            <a href={url}>({url})</a>
          </sub>
        </p>
        <p>
          {voteState.voteDisplay} Pts by {posterName} | hide | {/*numComments*/}{" "}
          <Link href="/comments">
            <a>comments</a>
          </Link>
        </p>
      </div>
    );
  }
  ////////////////////////////////////////////////////////////////////
  //////////////////////// LOGGED IN RETURN ...///////////////////////
  // * DIFFERENCES
  // - Upvote button
  // * Trash button to post if session user also posted message
  //
  //TESTS RENDERTRASH()
  //console.log(session.user.name);
  //console.log(posterName);
  ///////////////////////////////////////////////////////////////////
  return (
    <div style={{ border: "1px solid grey" }}>
      {/* WAITING TO ADD RANK, MAY BE ABLE TO DO OUTSIDE OF STATE IN <li>
      <span>{postInfo.rank} </span>
      */}
      <button onClick={handleVote}>+1</button>
      {url ? (
        <p>
          <a href={url}>{title} </a>
          <sub>
            <a href={url}>({url})</a>
          </sub>
          <sub>{id}</sub>
        </p>
      ) : (
        <p>
          <Link href={`/posts/${id}`}>
            <a>{title} </a>
          </Link>
          <sub>(text)</sub>
          <sub>{id}</sub>
        </p>
      )}
      <p>
        {voteState.voteDisplay} Pts By {posterName} {/*| hide*/} |{" "}
        {/*numComments*/}{" "}
        <Link href={`/posts/${id}`}>
          <a>comments</a>
        </Link>
        <span> | {postDate} </span>
      </p>
      {props.session.user.name === posterName ? (
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
///////////////////////////////////////////////////////////////////
//////////////////////// END ///////////////////////
///////////////////////////////////////////////////////////////////
