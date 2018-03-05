import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import {
  VictoryChart,
  VictoryTheme,
  VictoryScatter,
  VictoryLine
} from "victory";
import { getSnapshot } from "mobx-state-tree";
import { colors } from "../const";

const LineChart = inject("store")(
  observer(
    class LineChart extends Component {
      generateVictoryLine = (activeKey, index) => {
        const data = getSnapshot(this.props.store.activePidStore.pidData)[
          activeKey
        ].data;
        console.log(data);
        return [
          <VictoryLine
            key={`VL${index}`}
            style={{
              data: { stroke: colors[index] },
              parent: { border: "1px solid #ccc" }
            }}
            data={data}
            interpolation="cardinal"
          />,
          <VictoryScatter
            key={`VS${index}`}
            size={3}
            style={{
              data: { fill: colors[index] },
              parent: { border: "1px solid #ccc" }
            }}
            data={data}
            interpolation="cardinal"
          />
        ];
      };

      render() {
        return (
          <div>
            <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
              {this.props.store.activePidStore.selectedList.map(
                this.generateVictoryLine
              )}
            </VictoryChart>
          </div>
        );
      }
    }
  )
);

export default LineChart;
