import React, { useState, useEffect } from "react";

export default function Comment(props) {
  const allComments = props.allComments;
  const filteredComments = props.comment
    ? allComments.filter((c) => c.parent_comment_id === props.comment.id)
    : "";
  //console.log("props:", props);
  //console.log("filteredComments:", filteredComments);
  //console.log("allComments prop", allComments);

  const [commentBox, setCommentBox] = useState(false);
  const [comment, setComment] = useState(props.comment);
  const [user, setUser] = useState(props.comment.name);
  const [childComments, setchildComments] = useState(filteredComments);
  //console.log("childComments of commentLayout", childComments);
  //console.log("user", user);

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setComment({
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    setCommentBox(false);
    //Dhelper.createDpost(post);
    //console.log(post);
    //e.preventDefault();
    //setPost({
    //...post,
    //title: "",
    //url: "",
    //text: "",
    //});
  };

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
          onSubmit={function () {
            if (confirm("Submit Reply?")) {
              handleSubmit();
            }
          }}
        >
          <textarea
            id="text"
            name="text"
            value={comment.text}
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
