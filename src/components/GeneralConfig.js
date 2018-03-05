import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  Paper,
  FormControlLabel,
  Radio
} from "material-ui";
import Done from "material-ui-icons/Done";
import { getNumberOfCars } from "../services/websimApiCalls";
import { PulseLoader } from "halogen";

const GeneralConfig = inject("store")(
  observer(
    class GeneralConfig extends Component {
      componentDidMount() {
        this.interval = setInterval(this.checkOnline, 1000);
      }
      checkOnline = () => {
        if (this.props.store.activeCars > 0) {
          clearInterval(this.interval);
          return;
        }
        setTimeout(getNumberOfCars, 2000);
      };
      render() {
        const store = this.props.store;
        return (
          <Grid container direction="column" align="center">
            <Grid item>
              <Typography type="display1" color="primary">
                Websim Interface
              </Typography>
            </Grid>
            <Grid item>
              {store.activeCars === 0 && (
                <Grid direction="column" align="center" container item>
                  <Grid item>
                    <Typography>
                      We are trying to reach the server. Please make sure the
                      simulation is running.
                    </Typography>
                  </Grid>
                  <Grid item>
                    <PulseLoader size="20px" margin="4px" color="orange" />
                  </Grid>
                </Grid>
              )}
              {store.activeCars > 0 && (
                <Paper elevation={4}>
                  <List>
                    <ListItem>
                      Online:{" "}
                      <Done
                        style={{ marginLeft: "10px", color: "green" }}
                      />{" "}
                    </ListItem>
                    <ListItem>Active Cars: {store.activeCars}</ListItem>
                    <ListItem>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={store.viewStore.activeMode === "decentral"}
                            onChange={store.viewStore.setActiveMode}
                            value="decentral"
                            name="radio button decentral"
                          />
                        }
                        label="decentral"
                      />
                      <FormControlLabel
                        control={
                          <Radio
                            checked={store.viewStore.activeMode === "central"}
                            onChange={store.viewStore.setActiveMode}
                            value="central"
                            name="radio button central"
                          />
                        }
                        label="central"
                      />
                    </ListItem>
                  </List>
                </Paper>
              )}
            </Grid>
          </Grid>
        );
      }
    }
  )
);

export default GeneralConfig;
