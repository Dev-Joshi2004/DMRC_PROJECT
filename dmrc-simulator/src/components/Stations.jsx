import React from "react";

function Station({ x, y, name }) {
    return (
      <>
        <rect
          x={x - 35}
          y={y - 20}
          width="70"
          height="40"
          rx="5"
          fill="#003e9b"
          stroke="#00ff88"
        />
  
        <text
          x={x}
          y={y + 5}
          fill="white"
          textAnchor="middle"
        >
          {name}
        </text>
      </>
    );
  }
  
  export default Station;