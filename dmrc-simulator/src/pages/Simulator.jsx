import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { fetchSimulationData } from "../services/simulationApi";

import MetroMap from "../components/MetroMap";
import ControlPanel from "../panels/ControlPanel";
import LayoutCreator from "../components/LayoutCreator";
import { sampleLine } from "../data/sampleLine";
import EventLogPanel from "../panels/EventLogPanel";
import RouteSettingPanel from "../panels/RouteSettingPanel";

import useTrainSimulation from "../hooks/useTrainSimulation";

function Simulator() {
  const [lineData, setLineData] = useState(sampleLine);

  const [selectedRouteId,setSelectedRouteId] = useState(null);

  const [eventLogs, setEventLogs] = useState([]);

  const [routeReleased, setRouteReleased] = useState(false);

  const [backendData,setBackendData] = useState(null);

  //const train = useTrainSimulation(lineData.stations);

  //DELETE IT const upTrackCircuits = useMemo(() => lineData.trackCircuits.filter(tc => tc.direction === "UP"),[lineData.trackCircuits]);

  const train = useTrainSimulation(
    lineData.trackCircuits,
    lineData.stations,
    lineData.points,
    lineData.crossovers,
    (message) => {
  
      const currentTime =
        new Date().toLocaleTimeString();
  
      setEventLogs(prev => [
  
        `${currentTime} ${message}`,
  
        ...prev
  
      ]);
  
    }
  );

  useEffect(() => {

    const loadData =
      async () => {
  
        try {
  
          const data =
            await fetchSimulationData();
  
          setBackendData(data);
  
          console.log(
            "BACKEND DATA:",
            data
          );
  
        } catch (error) {
  
          console.error(error);
  
        }
  
      };
  
    loadData();
  
    const timer =
      setInterval(
        loadData,
        1000
      );
  
    return () =>
      clearInterval(timer);
  
  }, []);

  useEffect(() => {

    if (!selectedRouteId)
      return;
  
    const route =
      lineData.routes.find(
        r =>
          r.id === selectedRouteId
      );
  
    if (!route)
      return;
  
    const lastTC =
      route.tcIds[
        route.tcIds.length - 1
      ];
  
    if (
      train.currentTC === lastTC &&
      !routeReleased
    ) {
  
      setRouteReleased(true);

      setSelectedRouteId(null);
  
      setLineData(prev => ({
  
        ...prev,

        routes:prev.routes.map(route => ({

        ...route,

        active:false
      })),
  
        trackCircuits:
          prev.trackCircuits.map(tc => ({
  
            ...tc,
  
            locked:false
  
          }))
  
      }));
  
      addReleaseLogs(route);
  
    }
  
  }, [
    train.currentTC,
    selectedRouteId,
    routeReleased,
    lineData.routes
  ]);

  const handleGenerate = ( generatedStations, generatedCrossovers) => {

    setLineData(prev => ({

      ...prev,

      stations: generatedStations,

      crossovers:generatedCrossovers

    }));
  };

  const addReleaseLogs = (
    route
  ) => {
  
    const currentTime =
      new Date()
        .toLocaleTimeString();
  
    setEventLogs(prev => [
  
      `${currentTime} Route Released`,
  
      ...prev
  
    ]);

    setEventLogs(prev => [

      `${currentTime} S101 Changed RED`,
    
      ...prev
    
    ]);
  
    route.tcIds.forEach(tc => {
  
      setEventLogs(prev => [
  
        `${currentTime} ${tc} Unlocked`,
  
        ...prev
  
      ]);
  
    });
  
  };

  const handleRouteSelect = (routeId) => {

    const point =
  lineData.points?.[0];

  if(!point){
    return;
  }

if (
  point.position !== "NORMAL"
) {

  const currentTime =
    new Date()
      .toLocaleTimeString();

  setEventLogs(prev => [

    `${currentTime} Route Rejected - Point Reverse`,

    ...prev

  ]);

  return;

}

if (
  point.locked
) {

  const currentTime =
    new Date()
      .toLocaleTimeString();

  setEventLogs(prev => [

    `${currentTime} Route Rejected - Point Locked`,

    ...prev

  ]);

  return;

}
  
    const route =
      lineData.routes.find(
        r => r.id === routeId
      );

      const occupiedTC =
  train.currentTC;

const occupiedInsideRoute =
  route?.tcIds.some(
    tc =>
      tc === occupiedTC &&
      tc !== route.tcIds[0]
  );

if (
  occupiedInsideRoute
) {
      
        const currentTime =
          new Date()
            .toLocaleTimeString();
      
        setEventLogs(prev => [
      
          `${currentTime} Route Rejected - TC Occupied`,
      
          ...prev
      
        ]);
      
        return;
      
      }

      setRouteReleased(false);

      setSelectedRouteId(routeId);
  
    if(route){
  
      setLineData(prev => ({
        ...prev,
        routes:
          prev.routes.map(r => ({

          ...r,

          active:
            r.id === routeId

        })),
        trackCircuits:
        prev.trackCircuits.map(tc => ({

          ...tc,
  
          locked:
            route.tcIds.includes(tc.tcName)
  
        }))
      }));
  
      route.tcIds.forEach(tc => {
  
        const currentTime =
          new Date().toLocaleTimeString();
  
        setEventLogs(prev => [
  
          `${currentTime} ${tc} Locked`,
  
          ...prev
  
        ]);
  
      });
  
    }
  
    if(route){
  
      const currentTime =
        new Date().toLocaleTimeString();
  
      setEventLogs(prev => [
  
        `${currentTime} Route ${route.routeName} Set`,
  
        ...prev
  
      ]);

      setEventLogs(prev => [

        `${currentTime} S101 Changed GREEN`,
      
        ...prev
      
      ]);
  
    }
  
  };

  return (
    <div>
      <ControlPanel 
        train={train}
      />

      <LayoutCreator
        onGenerate={handleGenerate}
      />

      <RouteSettingPanel 
        routes={lineData.routes}
        onRouteSelect={handleRouteSelect}
        selectedRouteId={selectedRouteId}
      />

      <MetroMap

        stations={
          lineData.stations
        }

        crossovers={
          lineData.crossovers
        }

        points={
          lineData.points
        }

        routes={
          lineData.routes
        }

        trackCircuits={
          lineData.trackCircuits
        }

        signals={
          lineData.signals
        }

        train={train}

        selectedRouteId={
          selectedRouteId
        }
      />

      <EventLogPanel logs={eventLogs}/>
    </div>
  );
}

export default Simulator;