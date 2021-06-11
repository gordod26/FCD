import React, { useState, useEffect } from "react";
import { getidbyemail } from "../utils/helpers";
import { cmmtHelper } from "../utils/cmmtHelper";
import { Button, Spacer, Text, Collapse, Textarea } from "@geist-ui/react";

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
  //     textBoxToggle  is a switch for the comments textarea
  const [textBoxToggle, setTextBoxToggle] = useState({
    replyBox: false,
    editBox: false,
  });
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
  }, [props.session, textBoxToggle]);

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
    setTextBoxToggle({ ...textBoxToggle, replyBox: false });
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
    <Collapse
      subtitle={props.comment.name}
      initialVisible
      style={{
        marginLeft: "50px",
      }}
    >
      <Text>
        comment id: <b>{props.comment.id}</b> text {props.comment.cmmt}
      </Text>

      {!textBoxToggle.replyBox ? (
        <Button
          size="mini"
          auto
          ghost
          type="secondary"
          onClick={function () {
            setTextBoxToggle({ ...textBoxToggle, replyBox: true });
          }}
        >
          Reply
        </Button>
      ) : (
        <form
          onSubmit={function (e) {
            if (confirm("Submit Reply?")) {
              handleSubmit(e);
            }
          }}
        >
          <Textarea
            width="50%"
            placeholder="Comment"
            id="reply"
            name="reply"
            value={reply.text}
            onChange={handleInputChange}
          ></Textarea>
          <Spacer y={0.5} />
          <Button
            size="mini"
            auto
            type="secondary"
            ghost
            onClick={function (e) {
              if (confirm("Submit Reply?")) {
                handleSubmit(e);
                window.location.reload();
              }
            }}
          >
            Submit
          </Button>
          <Button
            size="mini"
            auto
            type="secondary"
            ghost
            onClick={function () {
              setTextBoxToggle({ ...textBoxToggle, replyBox: false });
            }}
          >
            Close
          </Button>
        </form>
      )}
      {/* EDIT BUTTON*/}
      <Spacer inline x={0.5} />
      {reply.userId === props.comment.user_id ? (
        !textBoxToggle.editBox ? (
          <Button
            auto
            size="mini"
            type="secondary"
            ghost
            onClick={() => {
              setTextBoxToggle(
                { ...textBoxToggle, editBox: true },
                setReply({ ...reply, cmmt: props.comment.cmmt })
              );
            }}
          >
            Edit
          </Button>
        ) : (
          <form
            onSubmit={function (e) {
              if (confirm("Submit Edit?")) {
                handleSubmit(e);
              }
            }}
          >
            <textarea
              id="edit"
              name="reply"
              value={reply.cmmt}
              onChange={handleInputChange}
            />
            <br />
            <input type="submit" value="Submit" />
          </form>
        )
      ) : (
        ""
      )}
      {childComments.map((c) => (
        <Comment
          key={childComments.indexOf(c)}
          comment={c}
          allComments={props.allComments}
          session={props.session}
        />
      ))}
    </Collapse>
  );
}
