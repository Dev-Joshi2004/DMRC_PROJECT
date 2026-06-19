function Route({
    startX,
    endX,
    y
  }) {
  
    return (
  
      <line
        x1={startX}
        y1={y}
        x2={endX}
        y2={y}
        stroke="#00BFFF"
        strokeWidth="10"
        opacity="0.4"
      />
  
    );
  
  }
  
  export default Route;