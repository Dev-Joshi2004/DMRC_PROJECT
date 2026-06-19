export const calculateSignalAspect = (
    signal,
    trackCircuits,
    routes
  ) => {
  
    const protectedTC =
      trackCircuits.find(
        tc =>
          tc.tcName === signal.protectedTC
      );
  
    if (!protectedTC) {
      return "RED";
    }
  
    if (protectedTC.occupied) {
      return "RED";
    }
  
    const activeRoute =
      routes.find(
        route =>
          route.active &&
          (
            route.fromSignal === signal.signalNo ||
            route.toSignal === signal.signalNo
          )
      );
  
    if (activeRoute) {
      return "GREEN";
    }
  
    return "RED";
  
  };