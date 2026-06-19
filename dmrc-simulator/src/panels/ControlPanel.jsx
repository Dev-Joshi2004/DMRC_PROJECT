import React from "react";

function ControlPanel({
  train
}) {

  return (

    <div
      style={{
        padding:"20px"
      }}
    >

      <h2>
        DMRC Simulator
      </h2>

      <p>
        Speed :
        {train?.speed}
        km/h
      </p>

      <p>
        State :
        {train?.state}
      </p>

      <p>
        Current Station :
        {
          train?.currentStation
          || "-"
        }
      </p>

      <p>
        Line :
        {train?.line}
      </p>

    </div>

  );

}

export default ControlPanel;