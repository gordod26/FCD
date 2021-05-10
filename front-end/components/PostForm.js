import React from "react";
import { useState, useReducer } from "react";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

export default function PostForm() {
  //const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState({
    title: "",
    url: "",
    text: "",
  });

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setSubmitting({
      ...submitting,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    alert("a post was submitted:");
    console.log(submitting);
    e.preventDefault();
  };
  //const handleSubmit = (event) => {
  //event.preventDefault();
  //setSubmitting(true);

  //setTimeout(() => {
  //setSubmitting(false);
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
        <label for="title">Title </label>
        <input
          type="title"
          id="title"
          name="title"
          value={submitting.title}
          onChange={handleInputChange}
        />
        <br />
        <label for="url">URL </label>
        <input
          type="url"
          name="url"
          value={submitting.url}
          onChange={handleInputChange}
        />
        <br />
        <b>or</b>
        <br />
        <label for="text">Text </label>
        <textarea
          id="text"
          name="text"
          value={submitting.text}
          onChange={handleInputChange}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
