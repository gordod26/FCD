import React, { useState, useEffect } from "react";
import DpostLayout from "./DpostLayout";

function DpostMap(props) {
  let posts = props.posts;

  return (
    <div>
      <ol>
        {posts ? (
          posts.map((post) => {
            return (
              <li key={post.id}>
                <DpostLayout
                  title={post.title}
                  url={post.url}
                  points={post.points}
                  poster={post.user_id}
                  created={post.created_at}
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