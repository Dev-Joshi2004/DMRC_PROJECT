export const calculateSignalAspect = (
  signal,
  trackCircuits,
  routes,
  train
) => {

  const protectedTC =
    trackCircuits.find(
      tc =>
        tc.tcName === signal.protectedTC
    );

  if (!protectedTC) {
    return "RED";
  }

  if (
    train.crossingOver && train.crossoverFrom === "TC106" && signal.signalNo === "S101"
  ) {
    return "RED";
  }

  if (
    train.crossingOver && train.crossoverFrom === "TC101" && signal.signalNo === "S102"
  ) {
    return "RED";
  }

  if (
    train.currentTC ===
    signal.protectedTC
  ) {
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