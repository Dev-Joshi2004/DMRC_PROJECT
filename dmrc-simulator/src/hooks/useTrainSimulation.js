import { useEffect, useState } from "react";
import { verifyPoint } from "../utils/pointLogic";

export default function useTrainSimulation(
  trackCircuits,
  stations,
  points,
  crossover,
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
      crossingProgress:0,
      crossoverFrom: null,
      lastStation: null
    });

  // Initial TC
  useEffect(() => {

    if (
      !trackCircuits ||
      trackCircuits.length === 0
    ) return;

    setTrain(prev => {

      if (prev.currentTC) return prev;

      return {
        ...prev,

      currentTC: "TC102"
      }

    });

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

            console.log(
              "CURRENT:",
              prev.currentTC
            );
            
            console.log(
              "NEXT:",
              currentTCData?.nextTC
            );

            if (!currentTCData) {
              return prev;
            }
            
            const currentStation =
              stations.find(
                station =>
                  station.tcName ===
                  prev.currentTC
              );
            
            const isUpTerminal =
              currentStation?.isTerminal === true;
            
            const isDownTerminal =
              prev.currentTC === "TC101";
            
            const isTerminalTC =
              isUpTerminal ||
              isDownTerminal;
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
                isDownTerminal
                  ? "Train Arrived Down Terminal"
                  : "Train Arrived Up Terminal"
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

        points[0].locked = true;

        addEvent?.(`${points[0].pointNo} Locked`);

        addEvent?.(
          "S101 Changed RED"
        );

        setTrain(prev => {

          console.log(
            "SETTING CROSSOVER FROM:",
            prev.currentTC
          );
        
          return {
        
            ...prev,
        
            terminalDwell: false,
        
            crossingOver: true,
        
            crossoverFrom: prev.currentTC
        
          };
        
        });

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

  console.log(
    "CROSSOVER FROM:",
    train.crossoverFrom
  );

  useEffect(() => {

    if (!train.crossingOver) return;

    addEvent?.(
      "Crossover Movement Started"
    );

    let progress = 0;

    const timer =
      setInterval(() => {
        progress += 10;

        setTrain(prev => ({

          ...prev,
  
          crossingProgress:
            progress
  
        }));

        if(progress >= 100) {
          points[0].locked = false;

          addEvent?.(`${points[0].pointNo} Unlocked`);
          clearInterval(timer);
        
        setTrain(prev => ({

          ...prev,

          crossingOver: false,

          crossingProgress:0,

          direction: prev.direction === "UP" ? "DOWN" : "UP",

          currentTC: prev.crossoverFrom === "TC106" ? "TC105" : "TC102",

        }));

        addEvent?.(
          "Crossover Movement Completed"
        );

        addEvent?.(
          "S101 Changed GREEN"
        );

      }

      }, 500);

    return () =>
      clearInterval(timer);

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

            currentTC: nextTC,

            lastStation: null

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