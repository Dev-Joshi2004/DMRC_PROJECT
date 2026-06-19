import { useEffect, useState } from "react";

export default function useTrainSimulation(
  trackCircuits
) {

  const [train, setTrain] =
    useState({
      trainNo: "T001",
      currentTC: null,
      speed: 65,
      direction: "UP"
    });

  useEffect(() => {

    if (
      !trackCircuits ||
      trackCircuits.length === 0
    )
      return;

    setTrain(prev => ({
      ...prev,
      currentTC:
        trackCircuits[0].tcName
    }));

    const timer =
      setInterval(() => {

        setTrain(prev => {

          const currentIndex =
            trackCircuits.findIndex(
              tc =>
                tc.tcName ===
                prev.currentTC
            );

          let nextIndex =
            currentIndex + 1;

          if (
            nextIndex >=
            trackCircuits.length
          ) {
            nextIndex = 0;
          }

          return {

            ...prev,

            currentTC:
              trackCircuits[
                nextIndex
              ].tcName

          };

        });

      }, 3000);

    return () =>
      clearInterval(timer);

  }, [trackCircuits]);

  return train;
}