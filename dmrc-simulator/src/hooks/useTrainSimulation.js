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
      terminalDwell: false,
      crossingOver: false,
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

      currentTC: "TC102"

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
          if (
            prev.dwell ||
            prev.terminalDwell || prev.crossingOver
          ) {
            console.log(
              "TRAIN HOLD"
            );
            return prev;
          }

          const currentTCData =
            trackCircuits.find(
              tc =>
                tc.tcName ===
                prev.currentTC
            );

          if (!currentTCData) {
            return prev;
          }
          if (
            currentTCData.nextTC === null
          ) {
          
            return prev;
          
          }

          const currentStation =
            stations.find(
              station =>
                station.tcName ===
                prev.currentTC
            );

          const isTerminalTC =
            currentStation?.isTerminal === true;
            if (
              isTerminalTC &&
              !prev.terminalDwell
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
            
              addEvent?.(
                "Train Arrived Terminal"
              );
            
              return {
            
                ...prev,
            
                terminalDwell:true
            
              };
            
            }
          // Arrival Event
          if (
            currentStation &&
            !currentStation.isTerminal &&
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

          console.log(
            "MOVING TO:",
            currentTCData.nextTC
          );

          return {

            ...prev,

            currentTC: currentTCData.nextTC

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

  //Terminal dwell
  useEffect(() => {

    if (
      !train.terminalDwell
    ) return;

    addEvent?.(
      "Terminal Dwell Started"
    );

    const timer =
      setTimeout(() => {

        setTrain(prev => ({

          ...prev,

          terminalDwell: false,

          crossingOver: true

        }));

        addEvent?.(
          "Terminal Dwell Completed"
        );

        addEvent?.(
          "Direction Changed"
        );

      }, 30000);

    return () =>
      clearTimeout(timer);

  }, [
    train.terminalDwell
  ]);

  //Crossover Movement

  useEffect(() => {

    if (!train.crossingOver)
      return;

    addEvent?.(
      "Crossover Movement Started"
    );

    const timer =
      setTimeout(() => {
        console.log(
          "CROSSOVER COMPLETE"
        );
        setTrain(prev => ({

          ...prev,

          crossingOver: false,

          direction: "DOWN",

          currentTC: "TC105"

        }));

        addEvent?.(
          "Crossover Movement Completed"
        );

      }, 5000);

    return () =>
      clearTimeout(timer);

  }, [
    train.crossingOver
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

          const currentTCData =
            trackCircuits.find(
              tc =>
                tc.tcName ===
                prev.currentTC
            );

          if (!currentTCData) {
            return prev;
          }

          const nextTC =
            currentTCData.nextTC;

          return {

            ...prev,

            dwell: false,

            currentTC: nextTC

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