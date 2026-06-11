import { useState , useEffect } from "react";

function LayoutCreator({ onGenerate }) {
  const [stationCount, setStationCount] = useState();
  const [crossoverCount, setCrossoverCount] = useState();

  const [crossovers, setCrossovers] = useState([
    {
      trackNumber: 1,
      direction: "UP_TO_DOWN"
    },
  ]);

  useEffect(() => {

    setCrossovers(prev =>
      prev.filter(
        crossover =>
        crossover.trackNumber <
        stationCount
      )
    );
  
  }, [stationCount]);

  const handleCrossoverCountChange = (count) => {
    setCrossoverCount(count);

    const arr = [];

    for (let i = 0; i < count; i++) {
      arr.push({
        trackNumber: 1,
        direction: "UP_TO_DOWN"
      });
    }

    setCrossovers(arr);
  };

  const updateCrossover = (
    index,
    field,
    value
  ) => {
    setCrossovers(prev =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
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

      {crossoverCount ?
        (crossovers.map((item, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "column" }}>
            <h4>
              Crossover {index + 1}
            </h4>

            <label>
              Between Track:
            </label>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <select
                value={item.trackNumber}
                onChange={(e) =>
                  updateCrossover(
                    index,
                    "trackNumber",
                    Number(e.target.value)
                  )
                }
              >
                {Array.from({
                  length: stationCount-1,
                }).map((_, i) => (
                  <option
                    key={i + 1}
                    value={i + 1}
                  >
                    ST-{String(i + 1).padStart(2, "0")}
                    {" ↔ "}
                    ST-{String(i + 2).padStart(2, "0")}
                  </option>
                ))}
              </select>

              <label>
                Direction:
              </label>

              <select
                value={item.direction}
                onChange={(e) =>
                  updateCrossover(
                    index,
                    "direction",
                    e.target.value
                  )
                }
              >
                <option value="UP_TO_DOWN">
                  UP → DOWN
                </option>

                <option value="DOWN_TO_UP">
                  DOWN → UP
                </option>

                <option value="SCISSOR">
                  SCISSOR
                </option>
              </select>
              <p>{item.direction}</p>
            </div>
          </div>
        )))
        : <></>
      }



      <br />

      <button onClick={generateLayout}>
        Generate Layout
      </button>
    </div>
  );
}

export default LayoutCreator;