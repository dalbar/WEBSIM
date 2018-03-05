// Collection of API requests
import { store } from "../stores/rootStore";

const URL_PREFIX = "http://localhost:8000/api/v1";

export const startSim = () => {
  fetch(`${URL_PREFIX}/simulation/start`).then(console.log("sim started"));
};

export const setLane = lane => {
  fetch(`${URL_PREFIX}/lane_assistant/lane`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({lane: lane, car_index: store.activeCar})
  })
};

export const getMapData = async () => {
  const jsonData = await fetch(`${URL_PREFIX}/navigation_assistant/map`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await jsonData.json();
  store.canvasStore.updateMapData(JSON.parse(data));
};

export const setDestPoint = index => {
  fetch(`${URL_PREFIX}/navigation_assistant/nav`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      dest_index: index,
      world_name: "ba_city.world",
      car_index: store.activeCar
    })
  }).then(res => {
    res.json().then(data => {
      store.activeCarStore.canvasStore.setPath(data);
    });
  });
};

export const getPidData = async target => {
  const resp = await fetch(`${URL_PREFIX}/lane_assistant/pid/${target}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  const jsonData = await resp.json();
  const data = JSON.parse(jsonData)["logs"];
  switch (target) {
    case "orientation":
      store.pidOrientationStore.replacePidData(data);
      break;
    case "velocity":
      store.pidVelocityStore.replacePidData(data);
      break;
    default:
      break;
  }
};

export const sendPidParams = (config, target) => {
  config["car_index"] = store.activeCar;
  fetch(`${URL_PREFIX}/lane_assistant/pid/${target}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(config)
  })
};

export const getNumberOfCars = async () => {
  console.log("reaching to server");
  const res = await fetch(`${URL_PREFIX}/numberOfCars`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }) 
    const number = await res.json();
    if(number){
      store.updateActiveCars(number);
    }
};

export const setMode = (mode) => {
  fetch(`${URL_PREFIX}/mode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({mode: mode})
  })
};