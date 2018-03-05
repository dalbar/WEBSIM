import { types, getSnapshot } from "mobx-state-tree";
import { data } from "./pidStore";

const R = require("ramda");

const mapToNeighbours = data => R.values(data.neighbours);

const mapToPosition = data => data.pos;

const getPosList = list => R.pipe(R.values)(list);

const sortBySmallestNumber = data => R.sort((a, b) => a - b, data);

const sortByBiggestNumber = data => R.sort((a, b) => b - a, data);

const getDrawableKeys = list =>
  R.pipe(
    R.map(mapToNeighbours),
    R.map(sortByBiggestNumber),
    R.filter(_neighbours => _neighbours[0] >= 10),
    R.keys
  )(list);

const reduceToDrawable = (keys, list) => R.pick(keys, list);

const getSortedPropsList = (data, prop) =>
  R.pipe(
    R.map(_data => R.values(R.pick([prop], _data))),
    R.flatten,
    sortBySmallestNumber
  )(data);

const mapData = types.model("MapData", {
  pos: data,
  neighbours: types.map(types.number)
});
export const canvasStore = types
  .model("CanvasStore", {
    data: types.optional(types.map(mapData), {}),
    offsetX: -30,
    offsetY: -30,
    scaling: 3,
    activeVertex: -1,
    curPath: types.optional(types.array(types.number), [])
  })
  .views(self => ({
    get transformationMap() {
      return {
        pos: {
          x: R.pipe(
            R.add(-self.minX),
          ),
          y: R.pipe(
            R.add(-self.minY),
          )
        }
      };
    },
    get mapData() {
      return R.map(entry => R.evolve(self.transformationMap, entry), getSnapshot(self.data));
    },
    get filteredMapData() {
      const data = getSnapshot(self.data);
      const drawableKeys = getDrawableKeys(data);
      const filteredData = reduceToDrawable(drawableKeys, data);
      return R.map(
        entry => R.evolve(self.transformationMap, entry),
        filteredData
      );
    },
    get posArray() {
      const posMap = R.map(mapToPosition, getSnapshot(self.data));      
      return getPosList(posMap);
    },
    get xCordList() {
      return getSortedPropsList(self.posArray, "x");
    },
    get yCordList() {
      return getSortedPropsList(self.posArray, "y");
    },
    get minX() {
      return R.head(self.xCordList);
    },
    get minY() {
      return R.head(self.yCordList);
    }
  }))
  .actions(self => ({
    updateMapData(data) {
      self.data = data;
    },
    setActiveVertex(value) {
      self.activeVertex = value;
    },
    zoomIn() {
      self.scaling += 0.5;
    },
    zoomOut() {
      if (self.scaling > 1) {
        self.scaling -= 0.5;
      }
    },
    goLeft() {
      self.offsetX += 10;
    },
    goRight() {
      self.offsetX -= 10;
    },
    goUp(){
      self.offsetY += 10;
    },
    goDown(){
      self.offsetY -= 10;
    },
    setPath(value){
      self.curPath = value; 
      console.log(value, self.curPath)
    }
  }));
