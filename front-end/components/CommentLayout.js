import React, { useState } from "react";
import { Dhelper } from "../utils/dPostUtils";

export default function Comment(props) {
  const allComments = props.allComments;
  const filteredComments = props.comment
    ? allComments.filter((c) => c.parent_comment_id === props.comment.id)
    : "";
  console.log("props:", props);
  console.log("filteredComments:", filteredComments);
  console.log("allComments prop", allComments);

  //const [propsChecker, setPropsChecker] = useState(function () {
  //if (props.comment) {
  //return true;
  //} else {
  //return false;
  //}
  //});
  const [commentBox, setCommentBox] = useState(false);
  const [comment, setComment] = useState(props.comment);
  const [childComments, setchildComments] = useState(filteredComments);
  console.log("childComments of commentLayout", childComments);

  //childComments = () => {
  //const { comment, allComments } = props;
  //return allComments.filter((c) => c.parent_comment_id === comment.id);
  //};

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
    <div style={{ border: "1px solid grey", marginLeft: "50px" }}>
      <b>userId:{props.comment.user_id}</b>
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
