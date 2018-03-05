import React from "react";
import { inject, observer } from "mobx-react";
import {
  Grid,
  BottomNavigation,
  BottomNavigationButton,
  Divider,
  Typography,
  FormControlLabel,
  Radio
} from "material-ui";
import ChartIcon from "material-ui-icons/ShowChart";
import ParameterIcon from "material-ui-icons/Build";
import GeneralIcon from "material-ui-icons/Settings";
import VisualizePid from "./VisualizePid";
import PidForms from "./PidForms";

const LaneAssistant = inject("store")(
  observer(
    class LaneAssistan extends React.Component {
      render() {
        const store = this.props.store;
        return (
          <Grid spacing={40} container align="center" direction="column">
            {store.viewStore.activeLaneFeature === 0 && (
              <Grid item container align="center" direction="column">
                <Grid item>
                  <Typography gutterBottom color="primary" type="display1">
                    Lane Assistant
                  </Typography>
                  <Typography paragraph>
                    You can use the folowing options to change the parameters of
                    the Lane Controller and analyse the outputs.
                  </Typography>
                  <Typography paragraph>
                    The following options determine, whether the car should use
                    the left or right side of the road.
                  </Typography>
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={store.activeCarStore.lane === "left"}
                        onChange={store.activeCarStore.setLane}
                        value="left"
                        name="radio button left"
                      />
                    }
                    label="Left"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        checked={store.activeCarStore.lane === "right"}
                        onChange={store.activeCarStore.setLane}
                        value="right"
                        name="radio button right"
                      />
                    }
                    label="Right"
                  />
                </Grid>
              </Grid>
            )}
            {store.viewStore.activeLaneFeature === 1 && <PidForms />}
            {store.viewStore.activeLaneFeature === 2 && <VisualizePid />}
            <Grid item>
              <Divider />
              <BottomNavigation
                showLabels
                value={store.viewStore.activeLaneFeature}
                onChange={store.viewStore.setActiveLaneFeature}
              >
                <BottomNavigationButton
                  label="General Config"
                  icon={<GeneralIcon />}
                />
                <BottomNavigationButton
                  label="PID Parameters"
                  icon={<ParameterIcon />}
                />
                <BottomNavigationButton
                  label="Visualize Data"
                  icon={<ChartIcon />}
                />
              </BottomNavigation>
            </Grid>
          </Grid>
        );
      }
    }
  )
);

export default LaneAssistant;
