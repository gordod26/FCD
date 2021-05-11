import React from "react";
import { useState, useReducer } from "react";
import Dhelper from "../utils/dPostUtils";
import { useSession } from "next-auth/client";

//const formReducer = (state, event) => {
//return {
//...state,
//[event.name]: event.value,
//};
//};

export default function PostForm() {
  //const [formData, setFormData] = useReducer(formReducer, {});
  const [session, loading] = useSession();
  const [post, setPost] = useState({
    userId: 1,
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

  const handleSubmit = (e) => {
    Dhelper.createDpost(post);
    console.log(post);
    e.preventDefault();
  };
  //const handleSubmit = (event) => {
  //event.preventDefault();
  //setPost(true);

  //setTimeout(() => {
  //setPost(false);
  //}, 3000);
  //};

  //const handleChange = (event) => {
  //setFormData({
  //name: event.target.name,
  //value: event.target.value,
  //});
  //};

  return (
    <div>
      <h1>Share</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title </label>
        <input
          type="title"
          id="title"
          name="title"
          value={post.title}
          onChange={handleInputChange}
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
