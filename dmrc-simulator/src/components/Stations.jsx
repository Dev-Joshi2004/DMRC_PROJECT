import React from "react";

function Station({
  x,
  y,
  name,
  position
}) {

  const stationY =
    position === "UP"
      ? y - 55
      : y + 25;

  const textY =
    position === "UP"
      ? y - 32
      : y + 50;

  return (
    <>
      <rect
        x={x - 35}
        y={stationY}
        width="70"
        height="30"
        rx="5"
        fill="#003e9b"
        stroke="#00ff88"
        strokeWidth="2"
      />

      <text
        x={x}
        y={textY}
        fill="white"
        textAnchor="middle"
        fontSize="12"
      >
        {name}
      </text>
    </>
  );
}

export default Station;