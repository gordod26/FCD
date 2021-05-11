import React, { useState, useEffect } from "react";
import Dhelper from "../utils/dPostUtils";
import { useSession } from "next-auth/client";
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
