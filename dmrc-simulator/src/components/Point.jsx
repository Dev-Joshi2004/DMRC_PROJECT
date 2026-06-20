function Point({
  x,
  y,
  pointNo,
  position,
  locked
}) {

  const color =
    locked
      ? "red"
      : position === "NORMAL"
      ? "#00ff66"
      : "yellow";

  return (
    <g>

      <circle
        cx={x}
        cy={y}
        r="8"
        fill={color}
      />

      <text
        x={x}
        y={y - 15}
        fill="white"
        fontSize="10"
        textAnchor="middle"
      >
        {pointNo}
      </text>

      <text
        x={x}
        y={y + 20}
        fill={color}
        fontSize="10"
        textAnchor="middle"
      >
        {position}
      </text>

    </g>
  );
}

export default Point;