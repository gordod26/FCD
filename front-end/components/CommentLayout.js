import React, { useState, useEffect } from "react";
import { getidbyemail } from "../utils/helpers";
import { cmmtHelper } from "../utils/cmmtHelper";

// This is the child component of CommentMap. it handles nesting and comment replies as well
export default function Comment(props) {
  //console.log("props:", props.session);
  const allComments = props.allComments;
  //console.log("allComments prop", allComments);

  //nst filteredComments : ternary operator prevents error when recursive component
  //                       gets to end of comment tree.
  const filteredComments = props.comment
    ? allComments.filter((c) => c.parent_comment_id === props.comment.id)
    : "";
  //console.log("filteredComments:", filteredComments);

  // Component States
  //     commentBox  is a switch for the comments textarea
  const [commentBox, setCommentBox] = useState(false);
  //     childComments  array of nested replies parent comment for recursion.
  const [childComments, setchildComments] = useState(filteredComments);
  //     reply  post object for replying
  const [reply, setReply] = useState({
    userId: "",
    dpostId: props.comment.dpost_id,
    parentId: props.comment.id,
    parentPath: props.comment.path,
    reply: "",
  });

  useEffect(() => {
    if (props.session) {
      getidbyemail(props.session.user.email, reply, setReply);
    }
  }, [props.session]);

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

  return (
    <div
      style={{
        borderLeft: "1px solid grey",
        marginLeft: "50px",
        marginBottom: "10px",
      }}
    >
      <b>userId:{props.comment.name}</b>
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
        <Comment
          key={childComments.indexOf(c)}
          comment={c}
          allComments={props.allComments}
        />
      ))}
    </div>
  );
}
