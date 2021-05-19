import React, { useState, useEffect } from "react";
import CommentLayout from "./CommentLayout";

export default function CommentMap({ cmmts }) {
  const [comments, setComments] = useState(cmmts);
  const [parentComments, setParentComments] = useState(
    comments.filter((c) => c.parent_comment_id === 0)
  );
  console.log("parentComments", parentComments);
  console.log("cmmt props passed to MAP", comments);
  return (
    <div>
      {parentComments.map((c) => {
        return <CommentLayout key={c.id} allComments={comments} comment={c} />;
      })}
    </div>
  );
}
