import React from "react";
import { observer } from "mobx-react";
import RefreshIcon from "material-ui-icons/Refresh";
import {
  Paper,
  TextField,
  Grid,
  FormGroup,
  FormLabel,
  IconButton
} from "material-ui";

const PidForm = observer(
  class PidForm extends React.Component {
    handleChange = name => event => {
      this.props.store.setParameter(name, event.target.value);
    };
    render() {
      return (
        <Grid item>
          <Paper style={{ padding: "30px" }} elevation={4}>
            <FormGroup>
              <FormLabel component="legend">{this.props.store.name}</FormLabel>
              <TextField
                id="p"
                label="p-Value"
                value={this.props.store.params["p"]}
                type="number"
                onChange={this.handleChange("p")}
                margin="normal"
              />
              <TextField
                id="i"
                label="i-Value"
                value={this.props.store.params["i"]}
                type="number"
                onChange={this.handleChange("i")}
                margin="normal"
              />
              <TextField
                id="d"
                label="d-Value"
                value={this.props.store.params["d"]}
                type="number"
                onChange={this.handleChange("d")}
                margin="normal"
              />
              <Grid container justify="flex-end">
                <Grid item>
                  <IconButton color="primary" aria-label="Add an alarm">
                    <RefreshIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </FormGroup>
          </Paper>
        </Grid>
      );
    }
  }
);

export default PidForm;
