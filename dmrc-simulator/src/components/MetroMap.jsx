import Station from "./Stations";
import Train from "./Train";

function MetroMap({
  stations,
  crossovers,
  trainPosition,
}) {
  if (!stations.length) return null;

  const firstX = stations[0].x;
  const lastX =
    stations[stations.length - 1].x;

  return (
    <svg width="1600" height="350">

      {/* UP LINE */}

      <line
        x1={firstX}
        y1="100"
        x2={lastX}
        y2="100"
        stroke="#00ff66"
        strokeWidth="4"
      />

      {/* DOWN LINE */}

      <line
        x1={firstX}
        y1="200"
        x2={lastX}
        y2="200"
        stroke="#ffdd00"
        strokeWidth="4"
      />

      {/* CROSSOVERS */}

      {crossovers.map(
        (crossover, index) => {

          const fromStation =
            stations.find(
              (s) =>
                s.id ===
                crossover.fromStation
            );

          const toStation =
            stations.find(
              (s) =>
                s.id ===
                crossover.toStation
            );

          if (
            !fromStation ||
            !toStation
          )
            return null;

          return (
            <g key={index}>

              {/* UP TO DOWN */}

              <line
                x1={fromStation.x}
                y1={100}
                x2={toStation.x}
                y2={200}
                stroke="red"
                strokeWidth="4"
              />

              {/* DOWN TO UP */}

              <line
                x1={fromStation.x}
                y1={200}
                x2={toStation.x}
                y2={100}
                stroke="red"
                strokeWidth="4"
              />

            </g>
          );
        }
      )}

      {/* UP STATIONS */}

      {stations.map((st) => (
        <Station
          key={`up-${st.id}`}
          x={st.x}
          y={100}
          name={st.name}
        />
      ))}

      {/* DOWN STATIONS */}

      {stations.map((st) => (
        <Station
          key={`dn-${st.id}`}
          x={st.x}
          y={200}
          name={st.name}
        />
      ))}

      <Train
        x={trainPosition}
        y={100}
      />
    </svg>
  );
}

export default MetroMap;