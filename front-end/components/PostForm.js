import React from "react";
import { useState, useEffect } from "react";
import Dhelper from "../utils/dPostUtils";
import { getidbyemail } from "../utils/helpers";
import { useSession } from "next-auth/client";

export default function PostForm() {
  //const [formData, setFormData] = useReducer(formReducer, {});
  const [session, loading] = useSession();
  const [post, setPost] = useState({
    postType: "",
    userId: "",
    title: "",
    url: "",
    text: "",
  });

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleRadioChange = (e) => {
    setPost({ ...post, postType: e.target.value });
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    Dhelper.createDpost(post);
    console.log(post);
    e.preventDefault();
    setPost({
      ...post,
      title: "",
      url: "",
      text: "",
    });
  };

  useEffect(() => {
    getidbyemail(session.user.email, post, setPost);
  }, []);

  return (
    <div>
      <h1>Share</h1>
      <form
        onSubmit={function () {
          if (confirm("Submit Post?")) {
            handleSubmit();
          }
        }}
      >
        <div onChange={handleRadioChange}>
          <input
            type="radio"
            id="discussion"
            name="postType"
            value="discussion"
            required
          />
          <label for="discussion">Discussion</label>
          <br />
          <input
            type="radio"
            id="project"
            name="postType"
            value="project"
            required
          />
          <label for="project">Project</label>
        </div>
        <label htmlFor="title">Title </label>
        <input
          type="title"
          id="title"
          name="title"
          value={post.title}
          onChange={handleInputChange}
          required
        />
        <br />
        <label htmlFor="url">URL </label>
        <input
          type="url"
          name="url"
          value={post.url}
          onChange={handleInputChange}
        />
        <br />
        <b>or</b>
        <br />
        <label htmlFor="text">Text </label>
        <textarea
          id="text"
          name="text"
          value={post.text}
          onChange={handleInputChange}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
