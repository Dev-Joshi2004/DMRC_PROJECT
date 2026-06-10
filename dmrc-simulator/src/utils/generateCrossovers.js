export function generateCrossovers(
    stations
  ) {
    const crossovers = [];
  
    if (stations.length < 4)
      return crossovers;
  
    crossovers.push({
      id: 1,
      x1: stations[0].x,
      y1: 100,
      x2: stations[1].x,
      y2: 200,
    });
  
    crossovers.push({
      id: 2,
      x1: stations[2].x,
      y1: 100,
      x2: stations[3].x,
      y2: 200,
    });
  
    return crossovers;
  }