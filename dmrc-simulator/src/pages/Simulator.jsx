import { useState } from "react";

import MetroMap from "../components/MetroMap";
import ControlPanel from "../components/ControlPanel";
import LayoutCreator from "../components/LayoutCreator";

import useTrainSimulation from "../hooks/useTrainSimulation";

function Simulator() {
  const [stations, setStations] =
    useState([]);

  const [crossovers, setCrossovers] =
    useState([]);

  const train =
    useTrainSimulation(stations);

  const handleGenerate = (
    generatedStations,
    generatedCrossovers
  ) => {
    setStations(generatedStations);

    setCrossovers(
      generatedCrossovers
    );
  };

  return (
    <div>
      <ControlPanel 
        train={train}
      />

      <LayoutCreator
        onGenerate={handleGenerate}
      />

      <MetroMap
        stations={stations}
        crossovers={crossovers}
        train={train}
      />
    </div>
  );
}

export default Simulator;