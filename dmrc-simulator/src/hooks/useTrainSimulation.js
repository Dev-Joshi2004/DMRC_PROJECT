import { useEffect, useState } from "react";

export default function useTrainSimulation(stations) {

  const [train, setTrain] = useState({
    position: 100,
    speed: 60,
    state: "RUNNING",
    currentStation: null,
    lastVisitedStation: null,
    line: "UP"
  });

  useEffect(() => {

    if (!stations.length) return;

    const firstX = stations[0].x;
    const lastX =
      stations[stations.length - 1].x;

    setTrain({
      position: firstX,
      speed: 60,
      state: "RUNNING",
      currentStation: null,
      lastVisitedStation: null,
      line: "UP"
    });

    let dwellTimeout;

    const timer = setInterval(() => {

      setTrain(prev => {

        if (prev.state === "DWELLING")
          return prev;

        const nextPosition =
          prev.line === "UP"
            ? prev.position + 1.5
            : prev.position - 1.5;

        const reachedStation =
          stations.find(
            station =>
              Math.abs(
                station.x -
                nextPosition
              ) < 2 &&
              station.name !==
              prev.lastVisitedStation
          );

        if (reachedStation) {

          dwellTimeout =
            setTimeout(() => {

              setTrain(old => ({
                ...old,
                state: "RUNNING",
                speed: 60
              }));

            }, 20000);

          return {
            ...prev,
            position:
              reachedStation.x,
            state: "DWELLING",
            speed: 0,
            currentStation:
              reachedStation.name,
            lastVisitedStation:
              reachedStation.name
          };
        }

        /*
        =====================
        END CROSSOVER
        UP -> DOWN
        =====================
        */

        if (
          prev.line === "UP" &&
          nextPosition >= lastX
        ) {

          return {
            ...prev,
            position: lastX,
            line: "DOWN",
            currentStation: null,
            lastVisitedStation: null
          };

        }

        /*
        =====================
        START CROSSOVER
        DOWN -> UP
        =====================
        */

        if (
          prev.line === "DOWN" &&
          nextPosition <= firstX
        ) {

          return {
            ...prev,
            position: firstX,
            line: "UP",
            currentStation: null,
            lastVisitedStation: null
          };

        }

        return {
          ...prev,
          position: nextPosition
        };

      });

    }, 50);

    return () => {

      clearInterval(timer);

      if (dwellTimeout)
        clearTimeout(
          dwellTimeout
        );

    };

  }, [stations]);

  return train;
}