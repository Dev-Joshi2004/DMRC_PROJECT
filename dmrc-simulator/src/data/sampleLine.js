export const sampleLine = {

    id: 1,
  
    name: "Blue Line",
  
    color: "#0099ff",
  
    stations: [
        {
            id:1,
            name:"Dwarka Sector 21",
            x:100
        },
        {
            id:2,
            name:"Dwarka Sector 8",
            x:300
        },
        {
            id : 3,
            name : "Dwarka Sector 9",
            x: 500
        }
    ],
  
    trackCircuits: [

        {
          id: 1,
          tcName: "TC101",
          startX: 100,
          endX: 350,
          occupied: true,
          direction: "DOWN"
        },
      
        {
          id: 2,
          tcName: "TC102",
          startX: 100,
          endX: 350,
          occupied: false,
          direction: "UP"
        },
      
        {
          id: 3,
          tcName: "TC103",
          startX: 350,
          endX: 700,
          occupied: false,
          direction: "DOWN"
        },
      
        {
          id: 4,
          tcName: "TC104",
          startX: 350,
          endX: 700,
          occupied: false,
          direction: "UP"
        }
      
    ],
  
    signals:[

        {
          id:1,
       
          signalNo:"S101",
       
          protectedTC:"TC101",
       
          x:100,
       
          y:80,
       
          direction:"UP"
        },
       
        {
          id:2,
       
          signalNo:"S102",
       
          protectedTC:"TC103",
       
          x:350,
       
          y:220,
       
          direction:"DOWN"
        }
       
    ],

    crossovers: [],
  
    points:[

      {
        id:1,
       
        pointNo:"P101",
       
        fromTC:"TC102",
       
        toTC:"TC202",
       
        position:"NORMAL",
       
        x:530,
       
        y:80
      }
       
    ],
  
    routes:[

        {
          id:1,
       
          routeName:"R1",
       
          fromSignal:"S101",
       
          toSignal:"S102",
       
          tcIds:[
            "TC101",
            "TC102",
            "TC103"
          ],
       
          active:true
        }
       
    ],
  
    trains:[

        {
          trainNo:"T001",
       
          currentTC:"TC102",
       
          speed:65,
       
          direction:"UP"
        }
       
    ],
  
  };