import { types, applySnapshot } from "mobx-state-tree";

const R = require("ramda");

const params = types.model({
  p: types.optional(types.union(types.number, types.string), 1),
  i: types.optional(types.union(types.number, types.string), 0),
  d: types.optional(types.union(types.number, types.string), 0)
});

export const data = types.model("coordData", {
  x: types.number,
  y: types.number
});

const controllerList = types.model({
  velocity: types.optional(params, params.create()),
  orientation: types.optional(params, params.create())
});

const pidData = types
  .model("pidData", {
    params: types.optional(controllerList, controllerList.create()),
    data: types.optional(types.array(data), [])
  })
  .views(self => ({
    get mean() {
      const yList = R.map(entry => Math.abs(entry.y), self.data);
      const mean = R.sum(yList) / yList.length;
      return mean;
    }
  }));

export const pidStore = types
  .model("pidStore", {
    name: types.string,
    pidData: types.optional(types.array(pidData), []),
    params: types.optional(params, params.create()),
    selectedList: types.optional(types.array(types.number), [])
  })
  .views(self => ({
    selected(key) {
      return self.selectedList.indexOf(key) !== -1;
    },
    getPos(key) {
      return self.selectedList.indexOf(key);
    }
  }))
  .actions(self => ({
    setParameter(name, value) {
      self.params[name] = value;
    },
    replacePidData(data) {
      applySnapshot(self.pidData, data);
    },
    select(key) {
      const arrayPos = self.selectedList.indexOf(key);
      arrayPos === -1
        ? self.selectedList.push(key)
        : self.selectedList.splice(arrayPos, 1);
    },
    resetSelected() {
      self.selectedList = [];
    }
  }));
