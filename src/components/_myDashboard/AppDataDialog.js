// material
import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import { TextField, Select, MenuItem, Grid, Button } from '@material-ui/core';
import TimePicker from '@material-ui/lab/TimePicker';
// ----------------------------------------------------------------------
const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '500px'
  },
  field: {
    width: '80%'
  },
  fieldContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    width: '100%'
  }
});

class FieldSchema {
  constructor(label, dataName, type, gridSize, fullwidth, special = {}) {
    this.label = label;
    this.dataName = dataName;
    this.type = type;
    this.gridSize = gridSize;
    this.fullwidth = fullwidth;
    this.special = special;
  }
}

const dataTypes = {
  TimeTrackerEdit: [
    new FieldSchema('task', 'task', 'textbox', [12, 12, 12], true),
    new FieldSchema('start', 'start', 'timepicker', [12, 3, 3], false),
    new FieldSchema('end', 'end', 'timepicker', [12, 3, 3], false),
    new FieldSchema('duration', 'duration', 'label', [12, 3, 3], false),
    new FieldSchema('quality', 'quality', 'selectbox', [12, 6, 6], false, [
      'Amazing!',
      'Great',
      'Good',
      'Meh',
      'Bad',
      'Terrible'
    ])
  ]
};

export default function AppDataDialog(props) {
  const classes = useStyles();
  const { title, data, dataTypeSchema, onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const generateField = ({ label, type, gridSize, fullwidth, special }) => {
    console.log('fullwidth', fullwidth);
    let element;
    if (type === 'textbox') {
      element = (
        <TextField
          key={label}
          label={label}
          fullWidth={fullwidth}
          classes={{ root: classes.field }}
        />
      );
    }
    if (type === 'timepicker') {
      element = (
        <LocalizationProvider key={label} dateAdapter={AdapterDateFns}>
          <TimePicker
            renderInput={(props) => <TextField {...props} />}
            margin="normal"
            label={label}
            fullWidth={fullwidth}
          />
        </LocalizationProvider>
      );
    }
    if (type === 'label') {
      element = (
        <TextField key={label} label={label} value="00:00:00" fullWidth={fullwidth} disabled />
      );
    }
    if (type === 'selectbox') {
      element = (
        <Select fullWidth={fullwidth} value={special[2]}>
          {special.map((item, id) => (
            <MenuItem key={id}>{item}</MenuItem>
          ))}
        </Select>
      );
    }

    return (
      <Grid
        item
        xs={gridSize[0]}
        md={gridSize[1]}
        lg={gridSize[2]}
        classes={{ root: classes.fieldContainer }}
      >
        {element}
      </Grid>
    );
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <Grid container spacing={3} classes={{ container: classes.container }}>
        {dataTypes.TimeTrackerEdit.map((field) => generateField(field))}

        <Grid item xs={12} md={12} lg={12} classes={{ root: classes.fieldContainer }}>
          <Button classes={{ root: classes.button }}>Cancel</Button>
          <Button classes={{ root: classes.button }}>Save</Button>
        </Grid>
      </Grid>
    </Dialog>
  );
}
