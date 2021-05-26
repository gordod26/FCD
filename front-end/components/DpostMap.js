import React, { useState, useEffect } from "react";
import DpostLayout from "./DpostLayout";

function DpostMap(props) {
  let posts = props.posts;

  //RETURNS ALL PROPERTIES OF PROP
  //console.log(posts);

  return (
    <div>
      <ol>
        {posts ? (
          posts.map((post) => {
            return (
              <li key={post.id}>
                <DpostLayout
                  session={props.session}
                  title={post.title}
                  url={post.url}
                  votes={post.votes}
                  poster={post.user_id}
                  created={post.created_at}
                  id={post.id}
                  name={post.name}
                  image={post.image}
                />
              </li>
            );
          })
        ) : (
          <div>Loading</div>
        )}
      </ol>
    </div>
  );
}
export default DpostMap;
