import React from "react";
import { observer, inject } from "mobx-react";
import LaneAssistant from "./LaneAssistant";
import NavigationAssistant from "./NavigationAssistant";
import GeneralConfig from "./GeneralConfig";

const selectFeature = index => {
  switch (index) {
    case 0:
      return <GeneralConfig />;
    case 1:
      return <LaneAssistant />;
    case 2:
      return <NavigationAssistant />;
    default:
      return <div>Not found</div>
  }
};

const FeatureContainer = inject("store")(
  observer(
    class FeatureContainer extends React.Component {
      render() {
        return <div style={{marginTop: "100px"}}>{selectFeature(this.props.store.viewStore.activeTab)}</div>
      }
    }
  )
);

export default FeatureContainer;
