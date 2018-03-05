import React from "react";
import { FormControlLabel, Radio } from "material-ui";
import { inject, observer } from "mobx-react";

const V2VForm = inject("store")(
  observer(props => {
    const { mode } = props;
    return (
      <FormControlLabel
        control={
          <Radio
            checked={store.viewStore.activeMode === mode}
            onChange={store.viewStore.setActiveMode}
            value={mode}
            name={`radio button ${mode}`}
          />
        }
        label={mode}
      />
    );
  })
);

export default V2VForm;
