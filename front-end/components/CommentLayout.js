import { useState } from "react";
import { Dhelper } from "../utils/dPostUtils";

export default function Comment({ cmmt }) {
  const [commentBox, setCommentBox] = useState(false);
  const [comment, setComment] = useState("");

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
    <div style={{ border: "1px solid grey" }}>
      <b>username:{/*cmmt.user*/}</b>
      <p>comment text .... {/*cmmt.text*/}</p>
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
    </div>
  );
}
