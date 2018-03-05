import React from "react";
import { Grid, Typography } from "material-ui";
import { PulseLoader } from "halogen";

export default () => {
  return (
    <Grid direction="column" align="center" container item>
      <Grid item>
        <Typography>
          We are trying to reach the server. Please make sure the simulation is
          running.
        </Typography>
      </Grid>
      <Grid item>
        <PulseLoader size="20px" margin="4px" color="orange" />
      </Grid>
    </Grid>
  );
};
