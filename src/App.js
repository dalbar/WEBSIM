import React, { Component } from "react";
import Navigation from "./components/Navigation";
import FeatureContainer from "./components/FeatureContainer";
import CarNavigation from "./components/CarNavigation";

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="content">
          <Navigation key="navigation" />,
          <FeatureContainer key="feature" />
        </div>
        <div className="footer">
          <CarNavigation />
        </div>
      </div>
    );
  }
}

export default App;
