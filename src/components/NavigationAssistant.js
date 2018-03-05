import React from "react";
import { observer, inject } from "mobx-react";
import { Layer, Line, Stage } from "react-konva";
import { Grid, Typography, IconButton, AppBar, Paper } from "material-ui";
import { getMapData } from "../services/websimApiCalls";
import Circle from "./KonvaVertex";

import {
  ZoomIn,
  CloudDownload,
  ZoomOut,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowUp,
  KeyboardArrowDown
} from "material-ui-icons";
const R = require("ramda");

const NavigationAssistant = inject("store")(
  observer(
    class NavigationAssistant extends React.Component<Props> {
      generatePoints = entry => {
        return (
          <Layer key={`Layer${entry[0]}`}>
            <Circle
              y={entry[1].pos.x}
              x={entry[1].pos.y}
              key={entry[0]}
              index={parseInt(entry[0], 10)}
            />
          </Layer>
        );
      };

      generateLines = entry => {
        const nKeys = R.keys(entry[1].neighbours);
        const lines = R.map(key => {
          return (
            <Line
              points={[
                this.props.store.canvasStore.mapData[key].pos.y,
                this.props.store.canvasStore.mapData[key].pos.x,
                entry[1].pos.y,
                entry[1].pos.x
              ]}
              stroke="blue"
              strokeWidth={1}
              key={`l${entry[0]}${key}`}
              lineCap="round"
              lineJoin="round"
              tension={1}
            />
          );
        }, nKeys);
        return (
          <Layer key={`Layer${entry[0]}`}>{lines.map(line => line)}</Layer>
        );
      };

      render() {
        console.log(this.props.store)
        const canvasStore = this.props.store.canvasStore;
        return (
          <Grid container direction="column" spacing={40} align="center">
            <Grid item>
              <Typography gutterBottom color="primary" type="display1">
                Navigation Assistant
              </Typography>
              <Typography paragraph>
                Use the <CloudDownload color="primary" /> button to get the map
                data. You can click on a point the map to start the navigation.
                You should see the correct route highlighted in green.
              </Typography>
              <AppBar color="default" position="static">
                <Grid container justify="center" direction="row">
                  <Grid item>
                    <IconButton color="primary" onClick={getMapData}>
                      <CloudDownload />
                    </IconButton>
                    <IconButton color="primary" onClick={canvasStore.goLeft}>
                      <KeyboardArrowLeft />
                    </IconButton>
                    <IconButton color="primary" onClick={canvasStore.goUp}>
                      <KeyboardArrowUp />
                    </IconButton>
                    <IconButton color="primary" onClick={canvasStore.goDown}>
                      <KeyboardArrowDown />
                    </IconButton>
                    <IconButton color="primary" onClick={canvasStore.goRight}>
                      <KeyboardArrowRight />
                    </IconButton>
                    <IconButton color="primary" onClick={canvasStore.zoomOut}>
                      <ZoomOut />
                    </IconButton>
                    <IconButton color="primary" onClick={canvasStore.zoomIn}>
                      <ZoomIn />
                    </IconButton>
                   
                  </Grid>
                </Grid>
              </AppBar>
            </Grid>
            <Grid item>
              <Paper>
                <Stage
                  width={800}
                  height={600}
                  scaleX={canvasStore.scaling}
                  scaleY={canvasStore.scaling}
                  offsetX={canvasStore.offsetX}
                  offsetY={canvasStore.offsetY}
                >
                  <Layer />
                  {Object.entries(canvasStore.mapData).map(this.generateLines)}
                  {Object.entries(canvasStore.filteredMapData).map(
                    this.generatePoints
                  )}
                </Stage>
              </Paper>
            </Grid>
          </Grid>
        );
      }
    }
  )
);

export default NavigationAssistant;
