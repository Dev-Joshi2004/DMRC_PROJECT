import { useEffect, useState } from "react";
import { verifyPoint } from "../utils/pointLogic";

export default function useTrainSimulation(
  trackCircuits,
  stations,
  points,
  addEvent
) {

  const [train, setTrain] =
    useState({
      trainNo: "T001",
      currentTC: null,
      speed: 65,
      direction: "UP",
      dwell: false,
      lastStation: null
    });

  // Initial TC
  useEffect(() => {

    if (
      !trackCircuits ||
      trackCircuits.length === 0
    ) return;

    setTrain(prev => ({

      ...prev,

      currentTC:
        trackCircuits[0].tcName

    }));

  }, [trackCircuits]);

  // Train Movement
  useEffect(() => {

    if (
      !trackCircuits ||
      trackCircuits.length === 0
    ) return;

    const timer =
      setInterval(() => {

        setTrain(prev => {

          // Train station pe ruki hui hai
          if (prev.dwell) {
            return prev;
          }

          const currentStation =
            stations.find(
              station =>
                station.tcName ===
                prev.currentTC
            );

          // Arrival Event
          if (
            currentStation &&
            prev.lastStation !==
              currentStation.name
          ) {

            addEvent?.(
              `Train Arrived ${currentStation.name}`
            );

            return {

              ...prev,

              dwell: true,

              lastStation:
                currentStation.name

            };

          }

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

  }, [
    trackCircuits,
    stations,
    addEvent
  ]);

  // Dwell Timer
  useEffect(() => {

    if (!train.dwell) return;

    const dwellTimer =
      setTimeout(() => {

        const station =
          stations.find(
            s =>
              s.tcName ===
              train.currentTC
          );

        if (station) {

          addEvent?.(
            `Train Departed ${station.name}`
          );

        }

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
            
              const point =
                points?.[0];
            
              const result =
                verifyPoint(point);
            
              addEvent?.(
                result.message
              );
            
              if (
                !result.allowed
              ) {
            
                addEvent?.(
                  "Train Held At Terminal"
                );
            
                return prev;
            
              }
            
              nextIndex = 0;
            
            }

          return {

            ...prev,

            dwell: false,

            currentTC:
              trackCircuits[
                nextIndex
              ].tcName

          };

        });

      }, 20000); // 20 sec dwell

    return () =>
      clearTimeout(
        dwellTimer
      );

  }, [
    train.dwell,
    train.currentTC,
    trackCircuits,
    stations,
    addEvent
  ]);

  return train;

}