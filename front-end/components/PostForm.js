import React from "react";

export default function PostForm() {
  return (
    <div>
      <h1>Share</h1>
      <form onsubmit="label">
        <label for="title">Title </label>
        <input type="title" id="title" name="title" />
        <br />
        <label for="url">URL </label>
        <input type="url" />
        <br />
        <b>or</b>
        <br />
        <label for="text">Text </label>
        <textarea id="text" name="text" />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
