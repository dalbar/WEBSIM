import React from "react";
import {
  Grid,
  Typography,
  FormControlLabel,
  IconButton,
  Radio
} from "material-ui";
import { observer, inject } from "mobx-react";
import { CloudDownload } from "material-ui-icons";
import { getPidData } from "../services/websimApiCalls";
import ParameterSelection from "./ParameterSelection";
import LineChart from "./LineChart";
const VisualizePid = inject("store")(
  observer(
    class VisualizePid extends React.Component {
      render() {
        const viewStore = this.props.store.viewStore;
        const store = this.props.store;
        return (
          <Grid item direction="column" container align="center">
            <Grid item>
              <Typography gutterBottom color="primary" type="display1">
                Visualize PID Data
              </Typography>
              <Typography paragraph>
                This feature visualizes the output of the chosen controller with
                certain parameters. It is also possible to compare different
                parameters with eachother.
              </Typography>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Radio
                    checked={viewStore.activeVis === "orientation"}
                    onChange={viewStore.setActiveVis}
                    value="orientation"
                    name="radio button orientation"
                  />
                }
                label="Orientation"
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={viewStore.activeVis === "velocity"}
                    onChange={viewStore.setActiveVis}
                    value="velocity"
                    name="radio button velocity"
                  />
                }
                label="Velocity"
              />
              <IconButton
                onClick={() => getPidData(viewStore.activeVis)}
                color="primary"
              >
                <CloudDownload />
              </IconButton>
            </Grid>
            <Grid item>
              {store.activePidStore.pidData.length > 0 && (
                <ParameterSelection />
              )}
              {store.activePidStore.pidData.length === 0 && (
                <Typography>We do not have any data yet </Typography>
              )}
              {store.activePidStore.selectedList.length > 0 && <LineChart />}
            </Grid>
          </Grid>
        );
      }
    }
  )
);

export default VisualizePid;
