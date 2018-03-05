import React from "react";
import { AppBar } from "material-ui";
import Tabs, { Tab } from "material-ui/Tabs";
import { observer, inject } from "mobx-react";
const Navigation = inject("store")(
  observer(
    class Navigation extends React.Component {
      render() {
        const store = this.props.store;
        const viewStore = store.viewStore;
        const online = store.activeCars === 0;
        return (
          <AppBar position="absolute" color="default">
            <Tabs
              value={viewStore.activeTab}
              onChange={viewStore.setActiveTab}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="General Configuration" />
              <Tab disabled={online} label="Lane Assistant" />
              <Tab disabled={online} label="Navigation Assistant" />
            </Tabs>
          </AppBar>
        );
      }
    }
  )
);

export default Navigation;
