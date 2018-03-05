import React from "react";
import PropTypes from "prop-types";
import { Paper, ListItem, List, Done } from "material-ui";
import V2VForm from "./V2VForm";

export default () => {
  return (
    <Paper elevation={4}>
      <List>
        <ListItem>
          Online: <Done style={{ marginLeft: "10px", color: "green" }} />{" "}
        </ListItem>
        <ListItem>Active Cars: {store.activeCars}</ListItem>
        <ListItem>
          <V2VForm mode="decentral" />
          <V2VForm mode="central" />
        </ListItem>
      </List>
    </Paper>
  );
};
