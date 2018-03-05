import { types } from "mobx-state-tree";
import { pidStore } from "./pidStore";
import { viewStore } from "./viewStore";
import { canvasStore } from "./canvasStore";
import { setLane } from "../services/websimApiCalls";

const carStore = types
  .model({
    pidVelocityStore: types.optional(pidStore, {
      name: "Velocity"
    }),
    pidOrientationStore: types.optional(pidStore, {
      name: "Orientation"
    }),
    canvasStore: types.optional(canvasStore, {}),
    lane: "right"
  })
  .actions(self => ({
    setLane(event) {
      self.lane = event.currentTarget.value;
      setLane(self.lane);
    }
  }));

const rootStore = types
  .model({
    carStores: types.optional(types.array(carStore), []),
    viewStore: types.optional(viewStore, {}),
    activeCar: 0
  })
  .views(self => ({
    get activeCars() {
      return self.carStores.length;
    },
    get test() {
      console.log("hello");
      return self.activeCar + 1;
    },
    get activeCarStore() {
      return self.carStores[self.activeCar];
    },
    get canvasStore() {
      return self.activeCarStore.canvasStore;
    },
    get pidOrientationStore() {
      return self.activeCarStore.pidOrientationStore;
    },
    get pidVelocityStore() {
      return self.activeCarStore.pidVelocityStore;
    },
    get activePidStore() {
      switch (self.viewStore.activeVis) {
        case "velocity":
          return self.activeCarStore.pidVelocityStore;
        case "orientation":
          return self.activeCarStore.pidOrientationStore;
        default:
          break;
      }
    }
  }))
  .actions(self => ({
    addCar() {
      self.carStores.push(carStore.create());
    },
    setActiveCar(event, value) {
      self.activeCar = value;
    },
    updateActiveCars(number) {
      while (self.activeCars < number) {
        self.addCar();
      }
    }
  }));

export const store = rootStore.create();
