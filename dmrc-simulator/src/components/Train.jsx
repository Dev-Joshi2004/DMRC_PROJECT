import React from "react";

function Train({
  x,
  y
}) {

  return (

    <rect
      x={x - 12}
      y={y - 6}
      width="24"
      height="12"
      rx="2"
      fill="cyan"
      stroke="white"
    />

  );

}

export default Train;