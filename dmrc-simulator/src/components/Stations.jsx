import React from "react";

function Station({
  x,
  y,
  name,
  position
}) {
  const textY =
    position === "UP"
      ? y - 82
      : y + 80;

  return (
    <>
      <text
        x={x}
        y={textY}
        fill="white"
        textAnchor="middle"
        fontSize="12"
        fontWeight={"bold"}
      >
        {name}
      </text>
    </>
  );
}

export default Station;