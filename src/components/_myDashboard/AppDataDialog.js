// material
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import { TextField, Select, MenuItem, Grid, Button } from '@material-ui/core';
import TimePicker from '@material-ui/lab/TimePicker';
import MobileTimePicker from '@material-ui/lab/MobileTimePicker';
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
  const [dataState, setDataState] = useState(data);
  const handleClose = () => {
    onClose();
  };

  const generateField = (idx, field, handleFieldChange) => {
    const { label, type, gridSize, fullwidth, special } = field;
    let element;
    if (type === 'textbox') {
      console.log('label', label, dataState);
      element = (
        <TextField
          key={label}
          label={label}
          fullWidth={fullwidth}
          classes={{ root: classes.field }}
          value={dataState[label]}
          onChange={handleFieldChange}
          inputProps={{ 'data-name': label }}
        />
      );
    } else if (type === 'timepicker') {
      element = (
        <LocalizationProvider key={label} dateAdapter={AdapterDateFns}>
          <MobileTimePicker
            renderInput={(props) => <TextField {...props} />}
            margin="normal"
            label={label}
            fullWidth={fullwidth}
            value={dataState[label]}
            // onAccept={(date) => handleDateChange(date, label)}
            onChange={(date) => handleDateChange(date, label)}
            inputProps={{ 'data-name': label }}
          />
        </LocalizationProvider>
      );
    } else if (type === 'label') {
      element = (
        <TextField
          key={label}
          label={label}
          fullWidth={fullwidth}
          disabled
          value={dataState[label]}
          onChange={handleFieldChange}
          inputProps={{ 'data-name': label }}
        />
      );
    } else if (type === 'selectbox') {
      element = (
        <Select fullWidth={fullwidth} value={special[2]}>
          {special.map((item, id) => (
            <MenuItem
              key={id}
              value={dataState[label]}
              onChange={handleFieldChange}
              inputprops={{ 'data-name': label }}
            >
              {item}
            </MenuItem>
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

  useEffect(() => {
    setDataState(data);
  }, [data]);

  // const addCat = () => {
  //   setCatState([...catState, { ...blankCat }]);
  // };

  const handleFieldChange = (e) => {
    const updatedData = [...dataState];
    updatedData[e.target.dataset.name] = e.target.value;
    setDataState(updatedData);
  };

  const timeDistance = (date1, date2) => {
    let distance = Math.abs(date1 - date2);
    const hours = Math.floor(distance / 3600000);
    distance -= hours * 3600000;
    const minutes = Math.floor(distance / 60000);
    distance -= minutes * 60000;
    const seconds = Math.floor(distance / 1000);
    return `${hours}:${`0${minutes}`.slice(-2)}:${`0${seconds}`.slice(-2)}`;
  };

  const handleDateChange = (date, label) => {
    const updatedData = [...dataState];
    updatedData[label] = date;
    updatedData['duration'] = timeDistance(updatedData['end'], updatedData['start']);
    setDataState(updatedData);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <Grid container spacing={3} classes={{ container: classes.container }}>
        {dataTypes.TimeTrackerEdit.map((field, idx) =>
          generateField(idx, field, handleFieldChange)
        )}

        <Grid item xs={12} md={12} lg={12} classes={{ root: classes.fieldContainer }}>
          <Button classes={{ root: classes.button }}>Cancel</Button>
          <Button classes={{ root: classes.button }}>Save</Button>
        </Grid>
      </Grid>
    </Dialog>
  );
}
