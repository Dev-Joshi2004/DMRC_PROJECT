function Point({
  x,
  y,
  pointNo,
  position,
  locked
}) {

  return (
    <g>

      <circle
        cx={x}
        cy={y}
        r="8"
        fill={
          locked
            ? "red"
            : position === "NORMAL"
              ? "green"
              : "orange"
        }
      />

      <text
        x={x}
        y={y - 15}
        fill="white"
        fontSize="10"
        textAnchor="middle"
      >
        {locked ? "LOCK" : ""}
      </text>

      <text
        x={x}
        y={y + 20}
        fill="white"
        fontSize="10"
        textAnchor="middle"
      >
        {pointNo}
      </text>

      <text
        x={x}
        y={y + 35}
        fill="white"
        fontSize="8"
        textAnchor="middle"
      >
        {position}
      </text>

    </g>
  );
}

export default Point;