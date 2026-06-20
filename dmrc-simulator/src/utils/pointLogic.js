export const verifyPoint = (
    point
  ) => {
  
    if (
      point.position ===
      "NORMAL"
    ) {
  
      return {
        allowed:true,
        message:
          `${point.pointNo} Verified NORMAL`
      };
  
    }
  
    return {
  
      allowed:false,
  
      message:
        `${point.pointNo} NOT NORMAL`
  
    };
  
  };