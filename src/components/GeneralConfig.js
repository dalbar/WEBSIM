import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Grid, Typography } from "material-ui";
import { getNumberOfCars } from "../services/websimApiCalls";
import ServerNotReachable from "./ServerNotReachable";
import SimProps from "./SimProps";

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
              {store.activeCars === 0 && <ServerNotReachable />}
              {store.activeCars > 0 && <SimProps />}
            </Grid>
          </Grid>
        );
      }
    }
  )
);

export default GeneralConfig;
