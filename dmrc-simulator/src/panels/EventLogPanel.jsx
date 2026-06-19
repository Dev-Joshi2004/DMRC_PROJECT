function EventLogPanel({
  logs
}) {

  return (

    <div
      style={{
        border:"1px solid gray",
        padding:"10px",
        width:"300px",
        height:"250px",
        overflowY:"auto"
      }}
    >

      <h3>
        Event Log
      </h3>

      {logs.map(
        (log,index) => (

          <div
            key={index}
            style={{
              marginBottom:"6px"
            }}
          >
            {log}
          </div>

        )
      )}

    </div>

  );

}

export default EventLogPanel;