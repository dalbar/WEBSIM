import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Grid
} from "material-ui";
import {blue} from "material-ui/colors/";
import TimeLine from "material-ui-icons/Timeline";
import DeleteIcon from "material-ui-icons/Delete";

import {colors} from "../const";

const ParameterSelection = inject("store")(
  observer(
    class ParameterSelection extends Component {
      handleChange = value => {
        this.props.UIStore.updateKey(
          this.props.index,
          value,
          this.props.target
        );
      };

      generateParameterCells = paramList => {
        return [
          <TableCell key={0} numeric>
            {paramList.p}
          </TableCell>,
          <TableCell key={1} numeric>
            {paramList.i}
          </TableCell>,
          <TableCell key={2} numeric>
            {paramList.d}
          </TableCell>
        ];
      };

      render() {
        const store = this.props.store;
        return (
          <Grid item>
            <Typography type="title">
              {store.activePidStore.name} Data
            </Typography>
            <Table>
              <TableHead>
                <TableRow key="defintion">
                  <TableCell padding="checkbox">
                    <IconButton onClick={() => store.activePidStore.resetSelected()}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell numeric>
                    P (orientation)
                  </TableCell>
                  <TableCell numeric>
                    I (orientation)
                  </TableCell>
                  <TableCell numeric>
                    D (orientation)
                  </TableCell>
                  <TableCell numeric>
                    P (velocity)
                  </TableCell>
                  <TableCell numeric>
                    I (velocity)
                  </TableCell>
                  <TableCell numeric>
                    D (velocity)
                  </TableCell>
                  <TableCell numeric>
                    <Typography color="primary">
                      Mean {store.activePidStore.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                        
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {store.activePidStore.pidData.map((data, index) => {
                  const selectionIndex = store.activePidStore.getPos(index);
                  const selected = selectionIndex !== -1;
                  return (
                    <TableRow key={index}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          style={{color: blue[500]}}
                          checked={selected}
                          onChange={() => store.activePidStore.select(index)}
                          disabled={store.activePidStore.selectedList.length>4 && !selected}
                        />
                      </TableCell>
                      {this.generateParameterCells(data.params.orientation)}
                      {this.generateParameterCells(data.params.velocity)}
                      <TableCell key={`${index}mean`} numeric>
                        {data.mean}
                      </TableCell>
                      <TableCell>
                        {selected && <TimeLine style={{color: colors[selectionIndex]}} />}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Grid>
        );
      }
    }
  )
);

export default ParameterSelection;
