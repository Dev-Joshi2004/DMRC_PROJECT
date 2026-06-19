function Point({
    x,
    y,
    position,
  }) {
  
    return (
  
      <g>
  
        <circle
          cx={x}
          cy={y}
          r="8"
          fill="orange"
        />
  
        <text
          x={x}
          y={y - 12}
          fill="white"
          fontSize="10"
          textAnchor="middle"
        >
          {position === "NORMAL"
            ? "N"
            : "R"}
        </text>
  
      </g>
  
    );
  
}
  
export default Point;