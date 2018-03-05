import React, { Component } from "react";
import { BottomNavigation, BottomNavigationButton , Divider} from "material-ui";
import { observer, inject } from "mobx-react";

const carButtons = amount => {
  const carButtons = [];
  for (let i = 0; i < amount; i++) {
    carButtons.push(<BottomNavigationButton key={`Car${i}`} label={`Car${i+1}`} />);
  }
  return carButtons;
};

const CarNavigation = inject("store")(
  observer(
    class componentName extends Component {
      render() {
        const store = this.props.store;
        const carButtonArray = carButtons(store.activeCars);
        return (
          <div>
            <Divider/>
            <BottomNavigation
              showLabels
              value={store.activeCar}
              onChange={store.setActiveCar}
            >
              {carButtonArray.map(carButton => carButton)}
            </BottomNavigation>
          </div>
        );
      }
    }
  )
);

export default CarNavigation;
