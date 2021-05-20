import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { getidbyemail } from "../utils/helpers";
import { cmmtHelper } from "../utils/cmmtHelper";

export default function Comment(props) {
  const allComments = props.allComments;
  const filteredComments = props.comment
    ? allComments.filter((c) => c.parent_comment_id === props.comment.id)
    : "";
  //console.log("props:", props.comment.dpost_id);
  //console.log("filteredComments:", filteredComments);
  //console.log("allComments prop", allComments);

  const [session, loading] = useSession();
  const [commentBox, setCommentBox] = useState(false);
  const [comment, setComment] = useState(props.comment);
  const [user, setUser] = useState(props.comment.name);
  const [childComments, setchildComments] = useState(filteredComments);
  const [reply, setReply] = useState({
    userId: "",
    dpostId: props.comment.dpost_id,
    parentId: props.comment.id,
    parentPath: props.comment.path,
    reply: "",
  });
  //console.log("childComments of commentLayout", childComments);
  //console.log("user", user);

  //path: `${post.dpost[0].id}`,

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setReply({
      ...reply,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    setCommentBox(false);
    cmmtHelper.postReply(reply);
    console.log(reply);
    e.preventDefault();
    window.location.reload();
    setReply({
      ...reply,
      reply: "",
    });
  };

  useEffect(() => {
    //SetTimeout to allow session to load
    setTimeout(() => {
      getidbyemail(session.user.email, reply, setReply);
      console.log("session", session.user.email);
    }, 5000);
  }, []);

  return (
    <div
      style={{
        borderLeft: "1px solid grey",
        marginLeft: "50px",
        marginBottom: "10px",
      }}
    >
      <b>userId:{user}</b>
      <p>
        comment id: <b>{props.comment.id}</b> text {props.comment.cmmt}
      </p>

      {!commentBox ? (
        <div>
          <button
            onClick={function () {
              setCommentBox(true);
            }}
          >
            Reply
          </button>
        </div>
      ) : (
        <form
          onSubmit={function (e) {
            if (confirm("Submit Reply?")) {
              handleSubmit(e);
            }
          }}
        >
          <textarea
            id="reply"
            name="reply"
            value={reply.text}
            onChange={handleInputChange}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      )}
      {childComments.map((c) => (
        <Comment comment={c} allComments={props.allComments} />
      ))}
    </div>
  );
}
