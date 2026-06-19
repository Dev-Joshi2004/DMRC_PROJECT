// =========================
// LINE
// =========================

export const Line = {

    id: null,
  
    name: "",
  
    color: "",
  
  };
  
  // =========================
  // STATION
  // =========================
  
  export const Station = {
  
    id: null,
  
    lineId: null,
  
    code: "",
  
    name: "",
  
    x: 0,
  
    y: 0,
  
  };
  
  // =========================
  // TRACK CIRCUIT
  // =========================
  
  export const TrackCircuit = {
  
    id: null,
  
    tcName: "",
  
    lineId: null,
  
    startX: 0,
  
    endX: 0,
  
    occupied: false,
  
  };
  
  // =========================
  // SIGNAL
  // =========================
  
  export const Signal = {
  
    id: null,
  
    signalNo: "",
  
    lineId: null,
  
    tcId: null,
  
    stationId: null,
  
    aspect: "RED",
  
    direction: "UP",
  
    x: 0,
  
    y: 0,
  
  };
  
  // =========================
  // POINT / TURNOUT
  // =========================
  
  export const Point = {
  
    id: null,
  
    pointNo: "",
  
    lineId: null,
  
    position: "NORMAL",
  
    x: 0,
  
    y: 0,
  
  };
  
  // =========================
  // ROUTE
  // =========================
  
  export const Route = {
  
    id: null,
  
    routeName: "",
  
    fromSignal: null,
  
    toSignal: null,

    tcIds: [],
  
    active: false,
  
  };
  
  // =========================
  // TRAIN
  // =========================
  
  export const Train = {
  
    id: null,
  
    trainNo: "",
  
    lineId: null,
  
    currentTC: null,
  
    speed: 0,
  
    direction: "UP",
  
    state: "RUNNING",
  
  };