import Station from "./Stations";
import Train from "./Train";

function MetroMap({
  stations,
  crossovers,
  train,
}) {
  if (!stations.length) return null;

  const firstX = stations[0].x;
  const lastX = stations[stations.length - 1].x;
  const crossoverOffset = 80;

  const getOccupiedTC = () => {

    for (
      let i = 0;
      i < stations.length - 1;
      i++
    ) {

      const start =
        stations[i].x;

      const end =
        stations[i + 1].x;

      if (
        train.position >= start &&
        train.position <= end
      ) {
        return i;
      }

    }

    return -1;

  };

  const occupiedSection =
    getOccupiedTC();

  return (
    <svg width="1600" height="350">

      {/* UP LINE */}

      {stations.slice(0, -1).map((st, index) => {

        const nextStation =
          stations[index + 1];

        const tcCount = 4;
        const tcGap = 6;

        const sectionLength =
          (nextStation.x - st.x) /
          tcCount;

        return (

          <g key={index}>

            {
              Array.from({
                length: tcCount
              }).map((_, tc) => {

                const startX =
                  st.x +
                  tc *
                  sectionLength +
                  tcGap / 2;

                const endX =
                  startX +
                  sectionLength -
                  tcGap;

                return (
                  <g key={tc}>
                    <line
                      key={tc}
                      x1={startX}
                      y1={100}
                      x2={endX}
                      y2={100}
                      stroke={
                        train.line === "UP" &&
                          occupiedSection === index
                          ? "red"
                          : "#00ff66"
                      }
                      strokeWidth="4"
                    />
                    <text
                      x={(startX + endX) / 2}
                      y={90}
                      fill="gray"
                      fontSize="8"
                      textAnchor="middle"
                    >
                      TC{index + 1}-{tc + 1}
                    </text>
                  </g>

                );

              })
            }

          </g>

        );

      })}

      {/* DOWN LINE */}

      {stations.slice(0, -1).map((st, index) => {

        const nextStation =
          stations[index + 1];

        const tcCount = 4;
        const tcGap = 6;

        const sectionLength =
          (nextStation.x - st.x) /
          tcCount;

        return (

          <g key={`dn-${index}`}>

            {
              Array.from({
                length: tcCount
              }).map((_, tc) => {

                const startX =
                  st.x +
                  tc *
                  sectionLength +
                  tcGap / 2;

                const endX =
                  startX +
                  sectionLength -
                  tcGap;

                return (
                  <g key={tc}>
                    <line
                      key={tc}
                      x1={startX}
                      y1={200}
                      x2={endX}
                      y2={200}
                      stroke={
                        train.line === "DOWN" &&
                          occupiedSection === index
                          ? "red"
                          : "#FFD700"
                      }
                      strokeWidth="4"
                    />

                    <text
                      x={(startX + endX) / 2}
                      y={220}
                      fill="gray"
                      fontSize="8"
                      textAnchor="middle"
                    >
                      TC{index + 1}-{tc + 1}
                    </text>
                  </g>

                );

              })
            }

          </g>

        );

      })}

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
          position="UP"
        />
      ))}

      {/* DOWN STATIONS */}

      {stations.map((st) => (

        <Station
          key={`dn-${st.id}`}
          x={st.x}
          y={200}
          name={st.name}
          position="DOWN"
        />
      ))}

{/* ===================== */}
{/* START TERMINAL */}
{/* DOWN -> UP */}
{/* ===================== */}

<line
  x1={firstX - 120}
  y1={100}
  x2={firstX}
  y2={100}
  stroke="#00ff66"
  strokeWidth="4"
/>

<line
  x1={firstX - 120}
  y1={200}
  x2={firstX}
  y2={200}
  stroke="#FFD700"
  strokeWidth="4"
/>

<line
  x1={firstX - 90}
  y1={100}
  x2={firstX - 30}
  y2={200}
  stroke="cyan"
  strokeWidth="4"
/>

{/* ===================== */}
{/* END TERMINAL */}
{/* UP -> DOWN */}
{/* ===================== */}

<line
  x1={lastX}
  y1={100}
  x2={lastX + 120}
  y2={100}
  stroke="#00ff66"
  strokeWidth="4"
/>

<line
  x1={lastX}
  y1={200}
  x2={lastX + 120}
  y2={200}
  stroke="#FFD700"
  strokeWidth="4"
/>

<line
  x1={lastX + 30}
  y1={100}
  x2={lastX + 90}
  y2={200}
  stroke="cyan"
  strokeWidth="4"
/>

      <Train
        x={train.position}
        y={
          train.line === "UP"
            ? 100
            : 200
        }
      />
    </svg>
  );
}

export default MetroMap;