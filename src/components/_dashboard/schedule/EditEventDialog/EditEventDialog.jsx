import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateTimePicker from '@material-ui/lab/TimePicker';

import './EditEventDialog.css';

function EditEventDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      classes={{ paper: 'dialog-box' }}
    >
      <DialogTitle id="simple-dialog-title">Edit Event</DialogTitle>
      <form noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <TextField label="Title" fullWidth />
          </Grid>

          <Grid item xs={3}>
            <FormControlLabel
              label="All Day"
              classes={{
                root: 'check-box'
              }}
              control={
                <Checkbox
                  // checked={state.checkedB}
                  // onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              styling={{
                paddingTop: '20px'
              }}
            />
          </Grid>

          <LocalizationProvider utils={DateFnsUtils} className="grid-hide">
            <Grid item xs={12} sm={6} className="grid-hide">
              <DateTimePicker
                label="Start Time/Date"
                variant="inline"
                value={selectedDate}
                onChange={handleDateChange}
                autoOk
              />
            </Grid>

            <Grid item xs={12} sm={6} className="grid-hide">
              <DateTimePicker
                label="End Time/Date"
                variant="inline"
                value={selectedDate}
                onChange={handleDateChange}
                autoOk
                // style={{width: "20px"}}
              />
            </Grid>
          </LocalizationProvider>

          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rowsMax={4}
              // value={value}
              // onChange={handleChange}
            />
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}

// const eventSchema = mongoose.Schema({
//   title:
//   allDay:
//   start:
//   end:
//   startStr:
//   endStr:
//   url:
//   classNames:
//   editable:
//   display:
//   backgroundColor:
//   borderColor:
//   textColor:
//   source:
// }, {timestamps: true});

EditEventDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};

export default EditEventDialog;

// function func(s, a, b) {
//   const matchEmpty = /^$/;
//   if (!s.match(matchEmpty)) {
//     let i = s.length - 1;
//     let aIndex = -1;
//     let bIndex = -1;

//     while (aIndex === -1 && bIndex === -1 && i >= 0) {
//       if (s.substring(i, i + 1) === a) aIndex = i;
//       if (s.substring(i, i + 1) === b) bIndex = i;
//       i--;
//     }

//     if (aIndex !== -1) {
//       if (bIndex === -1) return aIndex;
//       return Math.max(aIndex, bIndex);
//     }
//     if (bIndex !== -1) return bIndex;
//     return -1;
//   }
//   return -1;
// }
