import React from "react";
import { Circle } from "react-konva";
import { inject, observer } from "mobx-react";
import { setDestPoint } from "../services/websimApiCalls";

const KonvaVertex = inject("store")(
  observer(
    class KonvaVertex extends React.Component {
      checkPath = index => {
        if (index === this.props.index) {
          return true;
        }
        return false;
      };
      handleClick = () => {
        if (!this.props.active) {
          setDestPoint(this.props.index);          
          this.props.store.canvasStore.setActiveVertex(this.props.index);
        }
      };
      render() {
        const activeVertex = this.props.store.canvasStore.activeVertex;
        const onPath = this.props.store.activeCarStore.canvasStore.curPath.filter(
          this.checkPath
        );
        const color =
          activeVertex === this.props.index || onPath.length > 0
            ? "green"
            : "black";
        return (
          <Circle
            onClick={this.handleClick}
            y={this.props.y}
            x={this.props.x}
            radius={2}
            fill={color}
          />
        );
      }
    }
  )
);

export default KonvaVertex;
