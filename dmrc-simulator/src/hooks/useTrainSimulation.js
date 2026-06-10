import { useEffect, useState } from "react";

export default function useTrainSimulation(
  stations
) {
  const [position, setPosition] =
    useState(100);

  useEffect(() => {
    if (!stations.length) return;

    const firstX = stations[0].x;

    const lastX =
      stations[stations.length - 1].x;

    setPosition(firstX);

    const timer = setInterval(() => {
      setPosition((prev) => {
        if (prev >= lastX)
          return firstX;

        return prev + 2;
      });
    }, 20);

    return () =>
      clearInterval(timer);
  }, [stations]);

  return position;
}