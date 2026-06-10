import { useState } from "react";

function LayoutCreator({ onGenerate }) {
  const [stationCount, setStationCount] = useState();
  const [crossoverCount, setCrossoverCount] = useState();

  const [crossovers, setCrossovers] = useState([
    {
      fromStation: 1,
      toStation: 2,
    },
  ]);

  const handleCrossoverCountChange = (count) => {
    setCrossoverCount(count);

    const arr = [];

    for (let i = 0; i < count; i++) {
      arr.push({
        fromStation: 1,
        toStation: 2,
      });
    }

    setCrossovers(arr);
  };

  const updateCrossover = (
    index,
    field,
    value
  ) => {
    const updated = [...crossovers];

    updated[index][field] = value;

    setCrossovers(updated);
  };

  const generateLayout = () => {
    const stations = [];

    for (let i = 1; i <= stationCount; i++) {
      stations.push({
        id: i,
        name: `ST-${String(i).padStart(2, "0")}`,
        x: 100 + (i - 1) * 180,
      });
    }

    onGenerate(stations, crossovers);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Layout Designer</h2>

      <div>
        <label>Stations :</label>

        <input
          type="number"
          value={stationCount}
          min="2"
          onChange={(e) =>
            setStationCount(Number(e.target.value))
          }
        />
      </div>

      <br />

      <div>
        <label>Crossovers :</label>

        <input
          type="number"
          value={crossoverCount}
          min="0"
          onChange={(e) =>
            handleCrossoverCountChange(
              Number(e.target.value)
            )
          }
        />
      </div>

      <br />

      {crossovers.map((item, index) => (
        <div key={index}>
          <h4>
            Crossover {index + 1}
          </h4>

          <select
            value={item.fromStation}
            onChange={(e) =>
              updateCrossover(
                index,
                "fromStation",
                Number(e.target.value)
              )
            }
          >
            {Array.from({
              length: stationCount,
            }).map((_, i) => (
              <option
                key={i + 1}
                value={i + 1}
              >
                ST-{String(i + 1).padStart(2, "0")}
              </option>
            ))}
          </select>
            
            <h4>To</h4>

          <select
            value={item.toStation}
            onChange={(e) =>
              updateCrossover(
                index,
                "toStation",
                Number(e.target.value)
              )
            }
          >
            {Array.from({
              length: stationCount,
            }).map((_, i) => (
              <option
                key={i + 1}
                value={i + 1}
              >
                ST-{String(i + 1).padStart(2, "0")}
              </option>
            ))}
          </select>
        </div>
      ))}

      <br />

      <button onClick={generateLayout}>
        Generate Layout
      </button>
    </div>
  );
}

export default LayoutCreator;