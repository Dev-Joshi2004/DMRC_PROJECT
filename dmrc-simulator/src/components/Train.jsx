import React from "react";

function Train({ x, y }) {
    return (
      <circle
        cx={x}
        cy={y}
        r="10"
        fill="cyan"
      />
    );
  }
  
  export default Train;