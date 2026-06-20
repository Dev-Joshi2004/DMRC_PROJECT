import { useState } from "react";
import { useMemo } from "react";

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

  //const train = useTrainSimulation(lineData.stations);

  const upTrackCircuits = useMemo(() => lineData.trackCircuits.filter(tc => tc.direction === "UP"),[lineData.trackCircuits]);

  const train = useTrainSimulation(
    upTrackCircuits,
    lineData.stations,
    lineData.points,
    (message) => {
  
      const currentTime =
        new Date().toLocaleTimeString();
  
      setEventLogs(prev => [
  
        `${currentTime} ${message}`,
  
        ...prev
  
      ]);
  
    }
  );

  const handleGenerate = ( generatedStations, generatedCrossovers) => {

    setLineData(prev => ({

      ...prev,

      stations: generatedStations,

      crossovers:generatedCrossovers

    }));
  };

  const handleRouteSelect = (routeId) => {

  setSelectedRouteId(routeId);

  const route =
    lineData.routes.find(
      r => r.id === routeId
    );

  if(route){

    const currentTime =
      new Date()
      .toLocaleTimeString();

    setEventLogs(prev => [

      `${currentTime} Route ${route.routeName} Set`,

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
        routes={
          lineData.routes
        }
        onRouteSelect={
          handleRouteSelect
        }
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