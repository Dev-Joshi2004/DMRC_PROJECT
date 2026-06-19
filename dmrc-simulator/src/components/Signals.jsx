import React from "react";

function Signal({
    x,
    y,
    signalNo,
    aspect = "RED",
  }) {
  
    const getColor = () => {
  
      switch (aspect) {
  
        case "GREEN":
          return "#00ff66";
  
        case "YELLOW":
          return "#FFD700";
  
        case "RED":
          return "#ff3333";
  
        default:
          return "#888";
      }
  
    };
  
    return (
      <g>
  
        {/* Signal Head */}
  
        <circle
          cx={x}
          cy={y}
          r="7"
          fill={getColor()}
          stroke="white"
          strokeWidth="1"
        />
  
        {/* Signal Label */}
  
        <text
          x={x}
          y={y - 12}
          fill="white"
          fontSize="8"
          textAnchor="middle"
        >
          {signalNo}
        </text>
  
      </g>
    );
  }
  
  export default Signal;