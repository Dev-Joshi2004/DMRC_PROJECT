import Station from "./Stations";
import Train from "./Train";
import Signal from "./Signals";
import Point from "./Point";
import Route from "./Route";
import { calculateSignalAspect } from "../utils/signalLogic";

function MetroMap({
  stations = [],
  crossovers = [],
  points = [],
  routes = [],
  trackCircuits = [],
  signals = [],
  train,
  selectedRouteId,
}) {
  if (!stations.length) return null;

  const firstX = stations[0].x;
  const lastX = stations[stations.length - 1].x;
  const crossoverOffset = 80;

  const gapBetweenTwoTCs = 6;

  return (
    <svg width="1600" height="350">
      
      {console.log(train)};

      {/* UP TRACK CIRCUITS */}

      {trackCircuits.filter(tc => tc.direction === "UP").map(tc => (

        <g key={tc.id}>

          <line
            x1={tc.startX + gapBetweenTwoTCs/2}
            y1={100}
            x2={tc.endX - gapBetweenTwoTCs/2}
            y2={100}
            stroke={ train?.currentTC === tc.tcName ? "red" : "#00ff66" }
            strokeWidth="4"
          />

          <text
            x={
              (tc.startX + tc.endX) / 2
            }
            y={90}
            fill="gray"
            fontSize="8"
            textAnchor="middle"
          >
            {tc.tcName}
          </text>

        </g>

      ))}

      {/* ROUTES */}

      {routes.map(route => {

        if (route.id !== selectedRouteId) return null;

        const firstTC =
          trackCircuits.find(
            tc =>
              tc.tcName ===
              route.tcIds[0]
          );

        const lastTC =
          trackCircuits.find(
            tc =>
              tc.tcName ===
              route.tcIds[
              route.tcIds.length - 1
              ]
          );

        if (
          !firstTC ||
          !lastTC
        )
          return null;

        return (

          <Route
            key={route.id}
            startX={firstTC.startX}
            endX={lastTC.endX}
            y={100}
          />

        );

      })}

      {/* DOWN TRACK CIRCUITS */}

      {trackCircuits.filter(tc => tc.direction === "DOWN").map(tc => (

        <g key={`dn-${tc.id}`}>

          <line
            x1={tc.startX + gapBetweenTwoTCs/2}
            y1={200}
            x2={tc.endX - gapBetweenTwoTCs/2}
            y2={200}
            stroke={ train?.currentTC === tc.tcName ? "red" : "#00ff66" }
            strokeWidth="4"
          />

          <text
            x={
              (tc.startX + tc.endX) / 2
            }
            y={220}
            fill="gray"
            fontSize="8"
            textAnchor="middle"
          >
            {tc.tcName}
          </text>

        </g>

      ))}

      {/* SIGNALS */}

      {signals.map(signal => (

        <Signal
          key={signal.id}
          x={signal.x}
          y={signal.y}
          signalNo={signal.signalNo}
          aspect={
            calculateSignalAspect(
              signal,
              trackCircuits,
              routes
            )
          }
        />

      ))}

      {/* CROSSOVERS */}

      {crossovers?.map(
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
              <g key={index}>
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
              <g key={index}>
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

      {/* POINTS */}

      {points.map(point => (

        <Point
          key={point.id}
          x={point.x}
          y={point.y}
          position={point.position}
        />

      ))}

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