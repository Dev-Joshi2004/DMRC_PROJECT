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

          const trackIndex =
            crossover.trackNumber - 1;

          const station1 =
            stations[trackIndex];

          const station2 =
            stations[trackIndex + 1];

          if (
            !station1 ||
            !station2
          )
            return null;

          const midX =
            (station1.x +
              station2.x) / 2;

          if (
            crossover.direction ===
            "UP_TO_DOWN"
          ) {

            return (
              <line
                x1={midX - 30}
                y1={100}
                x2={midX + 30}
                y2={200}
                stroke="red"
                strokeWidth="4"
              />
            );

          }

          else if (
            crossover.direction ===
            "DOWN_TO_UP"
          ) {

            return (
              <line
                x1={midX - 30}
                y1={200}
                x2={midX + 30}
                y2={100}
                stroke="red"
                strokeWidth="4"
              />
            );

          }

          else if (crossover.direction === "SCISSOR") {
            return (

              <g>

                <line
                  x1={midX - 30}
                  y1={100}
                  x2={midX + 30}
                  y2={200}
                  stroke="cyan"
                  strokeWidth="4"
                />

                <line
                  x1={midX - 30}
                  y1={200}
                  x2={midX + 30}
                  y2={100}
                  stroke="cyan"
                  strokeWidth="4"
                />

              </g>

            );
          }
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