export const sampleLine = {

    id: 1,
  
    name: "Blue Line",
  
    color: "#0099ff",
  
    stations: [

      {
        id:1,
        name:"Dwarka Sector 21",
        x:100,
        tcName:"TC102"
      },
    
      {
        id:2,
        name:"Dwarka Sector 8",
        x:500,
        tcName:"TC104"
      },
    
      {
        id:3,
        name:"Dwarka Sector 9",
        x:900,
        tcName:"TC106",
        isTerminal: true
      }
    
    ],
  
    trackCircuits: [

        {
          id: 1,
          tcName: "TC101",
          nextTC: null,
          startX: 100,
          endX: 350,
          //occupied: true,
          locked:false,
          direction: "DOWN"
        },
      
        {
          id: 2,
          tcName: "TC102",
          nextTC: "TC104",
          startX: 100,
          endX: 350,
          //occupied: false,
          locked:false,
          direction: "UP"
        },
      
        {
          id: 3,
          tcName: "TC103",
          nextTC: "TC101",
          startX: 350,
          endX: 700,
          //occupied: false,
          locked:false,
          direction: "DOWN"
        },
      
        {
          id: 4,
          tcName: "TC104",
          nextTC: "TC106",
          startX: 350,
          endX: 700,
          //occupied: false,
          locked:false,
          direction: "UP"
        },

        {
          id: 5,
          tcName: "TC106",
          nextTC: "TC105",
          startX: 700,
          endX: 950,
          //occupied: false,
          locked:false,
          direction: "UP"
        },

        {
          id: 6,
          tcName: "TC105",
          nextTC: "TC103",
          startX: 700,
          endX: 950,
          //occupied: false,
          locked:false,
          direction: "DOWN"
        }
      
    ],
  
    signals:[

        {
          id:1,
       
          signalNo:"S101",
       
          protectedTC:"TC104",
       
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

    crossovers: [
      {
        id:1,
    
        fromTC:"TC106",
    
        toTC:"TC105",
    
        startX:930,
        startY:100,

        endX:990,
        endY:200
      },
      {
        id:2,
    
        fromTC:"TC101",
    
        toTC:"TC102",
    
        startX:70,
        startY:200,
      
        endX:10,
        endY:100
      }
    ],
  
    points:[

      {
        id:1,
       
        pointNo:"P101",
       
        fromTC:"TC106",
       
        toTC:"TC105",
       
        position:"NORMAL",

        locked: false, 
       
        x:700,
       
        y:150
      }
       
    ],
  
    routes:[

        {
          id:1,
       
          routeName:"R1",
       
          fromSignal:"S101",
       
          toSignal:"S102",
       
          tcIds:[
            "TC102",
            "TC104",
            "TC106"
          ],
      
          active:false
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