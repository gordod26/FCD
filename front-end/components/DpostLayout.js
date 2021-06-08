import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import Dhelper from "../utils/dPostUtils";
import { getidbyemail } from "../utils/helpers";
import {
  postVote,
  getVote,
  deleteVote,
  updateVoteCount,
} from "../utils/voteHelpers";
import { Text, Divider, Spacer, Link } from "@geist-ui/react";
import {
  ChevronUpCircleFill,
  ChevronUpCircle,
  Trash,
} from "@geist-ui/react-icons";

export default NewsPostLayout;

//START////////////////////////////////////////////////////////////////////////
function NewsPostLayout(props) {
  /////////////////////////////////////////////////////////////////////////////
  // STATES ///////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  const [posterName, setPosterName] = useState(props.name);
  const [voteState, setVoteState] = useState({
    voteDisplay: props.votes,
    postId: props.id,
    userId: "",
    didVote: "",
  });
  //console.log("SESSION TEST", props.session);
  /////////////////////////////////////////////////////////////////////////////
  // VARS /////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  const title = props.title;
  const url = props.url;
  const parsedUrl = url ? new URL(props.url) : "";
  const hostname = parsedUrl.hostname;
  const id = props.id;
  var postDate = props.created.slice(0, props.created.indexOf("T"));
  /////////////////////////////////////////////////////////////////////////////
  // HANDLERS /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  const handleVote = () => {
    if (voteState.didVote && voteState.voteDisplay <= 1) {
      return;
    } else if (voteState.didVote) {
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

  /////////////////////////////////////////////////////////////////////////////
  // console.log("DpostLayout posterid:", posterId);
  // console.log(props);
  /////////////////////////////////////////////////////////////////////////////
  // USEEFFECT HOOK ///////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (props.session) {
      getidbyemail(props.session.user.email, voteState, setVoteState);
      console.log("layout getemailbyid");
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
      <div>
        {url ? (
          <Text b>
            <a href={url}>{title} </a>
            <Text small>{hostname}</Text>
          </Text>
        ) : (
          <Text b>
            <Link href={`/posts/${id}`}>
              <a>{title} </a>
            </Link>
            <Text small>[text]</Text>
            <sub>{/*id*/}</sub>
          </Text>
        )}
        <br />
        <Text
          style={{
            // centers upvote icon
            marginTop: "0px",
            display: "flex",
            alignItems: "center",
            height: "16px",
          }}
        >
          {voteState.didVote ? (
            <ChevronUpCircleFill />
          ) : (
            <ChevronUpCircle size={19} />
          )}
          <Spacer inline x={0.2} />
          {voteState.voteDisplay} Pts by {posterName} &nbsp; | &nbsp;
          <NextLink href={`/posts/${id}`}>
            <Link underline>comments</Link>
          </NextLink>
        </Text>
        <Divider y={0} />
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
    <div>
      {url ? (
        <Text b>
          <a href={url}>{title} </a>
          <Text small>{hostname}</Text>
        </Text>
      ) : (
        <Text b>
          <Link href={`/posts/${id}`}>
            <a>{title} </a>
          </Link>
          <Text small> [text]</Text>
          <sub>{/*id*/}</sub>
        </Text>
      )}
      <br />
      <Text
        style={{
          // centers upvote icon
          marginTop: "0px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {voteState.didVote ? (
          <ChevronUpCircleFill size={19} onClick={handleVote} />
        ) : (
          <ChevronUpCircle size={19} onClick={handleVote} />
        )}
        <Spacer inline x={0.2} />
        {voteState.voteDisplay} Pts by {posterName} &nbsp; | &nbsp;
        <NextLink href={`/posts/${id}`}>
          <Link underline>comments</Link>
        </NextLink>
        {props.session.user.name === posterName ? (
          <>
            &nbsp; | &nbsp;
            <Trash
              size={19}
              style={{ marginTop: "auto" }}
              onClick={function () {
                if (confirm("Delete Post Permanently?")) {
                  handleDelete();
                  window.location.reload();
                }
              }}
            />
          </>
        ) : (
          ""
        )}
      </Text>
      <Divider y={0} />
    </div>
  );
}
///////////////////////////////////////////////////////////////////
//////////////////////// END ///////////////////////
///////////////////////////////////////////////////////////////////
