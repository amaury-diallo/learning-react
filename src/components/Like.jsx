import React from "react";

const Like = (props) => {
  let classes = "fa ";
  classes += props.isLiked ? "fa-heart" : "fa-heart-o";
  return (
    <i
      onClick={() => props.onLike(props.target)}
      className={classes}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
