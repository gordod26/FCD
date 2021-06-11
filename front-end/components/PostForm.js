import React from "react";
import { useState, useEffect } from "react";
import Dhelper from "../utils/dPostUtils";
import { getidbyemail } from "../utils/helpers";
import { useSession } from "next-auth/client";
import { Button, Textarea, Spacer, Radio, Text, Input } from "@geist-ui/react";

export default function PostForm() {
  //const [formData, setFormData] = useReducer(formReducer, {});
  const [session, loading] = useSession();
  const [post, setPost] = useState({
    postType: "discussion",
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
      <Text h2>Share</Text>
      <div onChange={handleRadioChange}>
        <Radio.Group value="discussion" useRow>
          <Radio value="discussion" required name="postType" id="discussion">
            Discussion
          </Radio>
          <Radio value="project" id="discussion" name="postType required">
            Project
          </Radio>
        </Radio.Group>
      </div>
      <Input
        type="title"
        placeholder="Descriptive Title"
        id="title"
        name="title"
        value={post.title}
        onChange={handleInputChange}
        required
      ></Input>
      <Spacer y={0.5} />
      <Input
        type="url"
        placeholder="URL"
        id="url"
        name="url"
        value={post.url}
        onChange={handleInputChange}
        required
      ></Input>
      <Spacer y={0.5} />
      <Text b> or </Text>
      <Spacer y={0.5} />
      <Textarea
        width="50%"
        placeholder="Text Post"
        id="text"
        name="text"
        value={post.text}
        onChange={handleInputChange}
      ></Textarea>
      <br />
      <Button
        auto
        type="secondary"
        size="small"
        onClick={function () {
          if (confirm("Submit Post?")) {
            handleSubmit();
            window.location.reload();
          }
        }}
        style={{ marginTop: "5px" }}
      >
        Submit Post
      </Button>
    </div>
  );
}
