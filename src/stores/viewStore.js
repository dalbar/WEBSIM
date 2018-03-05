import { types } from "mobx-state-tree";
import {setMode} from '../services/websimApiCalls'

export const viewStore = types
  .model({
    activeTab: types.optional(types.number, 0),
    activeLaneFeature: types.optional(types.number, 0),
    activeVis: types.optional(types.string, "orientation"),
    activeMode: types.optional(types.string, "decentral")
  })
  .actions(self => ({
    setActiveTab(event, value) {
      self.activeTab = value;
    },
    setActiveLaneFeature(event, value) {
      self.activeLaneFeature = value;
    },
    setActiveVis(event) {
      self.activeVis = event.currentTarget.value;
    },
    setActiveMode(event) {
      self.activeMode = event.currentTarget.value;
      setMode(self.activeMode)
    }
  }));

// export const viewStoreInstance = viewStore.create();