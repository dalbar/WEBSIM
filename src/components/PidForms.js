import React from "react";
import { inject } from "mobx-react";
import { Grid, Typography } from "material-ui";
import PidForm from "./PidForm";
import RefreshIcon from "material-ui-icons/Refresh";

const PidForms = inject("store")(
    class PidForms extends React.Component {
      render() {
        const store = this.props.store;        
        return (
          <Grid item container align="center" justify="center">
            <Grid item>
              <Typography gutterBottom color="primary" type="display1">
                PID Parameters
              </Typography>
              <Typography paragraph>
                You can use these forms to update and tune the PID Parameters of
                CarX. Use the <RefreshIcon color="primary" /> button to send the
                updated parameters to the simulation.
              </Typography>
            </Grid>
            <Grid item justify="center" container>
              <PidForm store={store.pidOrientationStore} />
              <PidForm store={store.pidVelocityStore} />
            </Grid>
          </Grid>
        );
      }
    }
);

export default PidForms;
