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

  

 
  // ===================================================
  // REALISTIC VARIABLE-LENGTH TC GENERATOR
  // ===================================================
  // In real DMRC sections, track circuits (TCs) are NOT
  // equal-length. Longer station gaps get more TCs, and
  // each TC has a different length depending on signal
  // spacing, curvature, points/crossovers nearby, etc.
  //
  // This function fakes that realism using a repeating
  // ratio pattern (instead of pure random, so it still
  // looks structured) and scales TC count to gap length.
  // ===================================================

  const tcGap = 6; // visual gap between TC blocks (kept same as before)

  // Ratio "shapes" that repeat/cycle to vary TC lengths
  // within a gap. Values are relative weights, not pixels.
  const tcRatioPatterns = [
    [80, 20, 60, 40],
    [50, 90, 30, 70, 25],
    [100, 35, 65],
    [45, 45, 90, 20, 60],
    [70, 30, 80],
  ];

  const getTCCountForGap = (gapLength) => {
    // Longer physical gap between stations -> more TCs.
    // Tuned roughly so a ~150px gap gives ~3 TCs and a
    // ~400px+ gap gives up to 7 TCs.
    if (gapLength < 160) return 3;
    if (gapLength < 220) return 4;
    if (gapLength < 280) return 5;
    if (gapLength < 340) return 6;
    return 7;
  };

  const generateTCs = (st, nextStation, stationIndex) => {
    const gapLength = nextStation.x - st.x;
    const tcCount = getTCCountForGap(gapLength);

    // Pick a ratio pattern deterministically based on the
    // station index so it's stable across re-renders, not
    // randomly reshuffled every time.
    const basePattern =
      tcRatioPatterns[stationIndex % tcRatioPatterns.length];

    // Stretch/cycle the base pattern to match tcCount
    const weights = Array.from({ length: tcCount }).map(
      (_, i) => basePattern[i % basePattern.length]
    );

    const totalWeight = weights.reduce((a, b) => a + b, 0);

    // Total space available for TC bodies after removing
    // gaps between them
    const usableLength = gapLength - tcGap * tcCount;

    let cursor = st.x + tcGap / 2;

    return weights.map((weight, tc) => {
      const tcLength = (weight / totalWeight) * usableLength;
      const startX = cursor;
      const endX = startX + tcLength;
      cursor = endX + tcGap;

      return { tc, startX, endX };
    });
  };

  const getOccupiedTC = () => {

  for (
    let section = 0;
    section < stations.length - 1;
    section++
  ) {

    const tcs =
      generateTCs(
        stations[section],
        stations[section + 1],
        section
      );

    for (const tcData of tcs) {

      if (
        train.position >= tcData.startX &&
        train.position <= tcData.endX
      ) {

        return {
          section,
          tc: tcData.tc
        };

      }

    }

  }

  return null;

};

  const occupiedTC =
    getOccupiedTC();


  return (
    <svg width="1600" height="350">

      {/* UP LINE */}

      {stations.slice(0, -1).map((st, index) => {

        const nextStation =
          stations[index + 1];

        const tcs = generateTCs(st, nextStation, index);

        return (

          <g key={index}>

            {tcs.map(({ tc, startX, endX }) => (
              <g key={tc}>
                <line
                  key={tc}
                  x1={startX}
                  y1={100}
                  x2={endX}
                  y2={100}
                  stroke={
                    train.line === "UP" &&
                      occupiedTC &&
                      occupiedTC.section === index &&
                      occupiedTC.tc === tc
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
            ))}

          </g>

        );

      })}

      {/* DOWN LINE */}

      {stations.slice(0, -1).map((st, index) => {

        const nextStation =
          stations[index + 1];

        const tcs = generateTCs(st, nextStation, index);

        return (

          <g key={`dn-${index}`}>

            {tcs.map(({ tc, startX, endX }) => (
              <g key={tc}>
                <line
                  key={tc}
                  x1={startX}
                  y1={200}
                  x2={endX}
                  y2={200}
                  stroke={
                    train.line === "DOWN" &&
                      occupiedTC &&
                      occupiedTC.section === index &&
                      occupiedTC.tc === tc
                      ? "red"
                      : "#00ff66"
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
            ))}

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
              <g key = {index}>
              <line
                x1={midX - 30}
                y1={100}
                x2={midX + 30}
                y2={200}
                stroke="#00ff66"
                strokeWidth="4"
              />
              </g>
            );

          }

          else if (
            crossover.direction ===
            "DOWN_TO_UP"
          ) {

            return (
              <g key = {index}>
              <line
                x1={midX - 30}
                y1={200}
                x2={midX + 30}
                y2={100}
                stroke="#00ff66"
                strokeWidth="4"
              />
              </g>
            );

          }

          else if (crossover.direction === "SCISSOR") {
            return (

              <g key={index}>

                <line
                  x1={midX - 30}
                  y1={100}
                  x2={midX + 30}
                  y2={200}
                  stroke="#00ff66"
                  strokeWidth="4"
                />

                <line
                  x1={midX - 30}
                  y1={200}
                  x2={midX + 30}
                  y2={100}
                  stroke="#00ff66"
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
        stroke="#00ff66"
        strokeWidth="4"
      />

      <line
        x1={firstX - 90}
        y1={100}
        x2={firstX - 30}
        y2={200}
        stroke="#00ff66"
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
        stroke="#00ff66"
        strokeWidth="4"
      />

      <line
        x1={lastX + 30}
        y1={100}
        x2={lastX + 90}
        y2={200}
        stroke="#00ff66"
        strokeWidth="4"
      />

      <Train
  x={train.x ?? train.position}
  y={
    train.y ??
    (
      train.line === "UP"
        ? 100
        : 200
    )
  }
/>
    </svg>
  );
}

export default MetroMap;