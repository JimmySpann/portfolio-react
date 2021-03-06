import { useState } from 'react';
import PropTypes from 'prop-types';
// material
import { makeStyles } from '@material-ui/styles';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import {
  Card,
  CardHeader,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Select,
  MenuItem
} from '@material-ui/core';
import MobileTimePicker from '@material-ui/lab/MobileTimePicker';
// components
import Scrollbar from '../../Scrollbar';
import TimeTableHead from './TimeTableHead';
import TimeMoreMenu from './TimeMoreMenu';
import AppDataDialog from '../AppDataDialog';
// utils
import { fToDuration } from '../../../utils/formatTime';
// ----------------------------------------------------------------------
const useStyles = makeStyles({
  timePicker: {
    width: 100
  },
  taskField: {
    width: 120
  },
  label: {
    textTransform: 'capitalize'
  },
  tableCell: {
    padding: '8px'
  }
});

const TABLE_HEAD = [
  { id: 'task', label: 'Task', alignRight: false },
  { id: 'start', label: 'Start', alignRight: false },
  { id: 'end', label: 'End', alignRight: false },
  { id: 'duration', label: 'Duration', alignRight: false },
  { id: 'quality', label: 'Quality', alignRight: false },
  { id: 'menu', label: 'Menu', alignRight: false }
];

AppTimeActivity.propTypes = {
  children: PropTypes.any,
  activities: PropTypes.object
};

export default function AppTimeActivity({ activities }) {
  const classes = useStyles();
  const [activityList, setActivityList] = useState(activities);
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogData, setDialogData] = useState(activityList[0]);

  const handleFieldChange = (e, idx = '', cusLabel = '') => {
    const updatedData = [...activityList];
    let id;
    let label;
    if (e.target.dataset) {
      // Warning: Could cause issue if use dataset more in future (doubtful)
      [id, label] = e.target.dataset.name.split('-');
    } else if (idx !== '') {
      id = idx;
      label = cusLabel;
    }

    updatedData[id][label] = e.target.value;
    setActivityList(updatedData);
  };
  const handleDateChange = (date, label, id) => {
    const updatedData = [...activityList];
    updatedData[id][label] = date;
    updatedData[id]['duration'] = fToDuration(updatedData[id]['end'], updatedData[id]['start']);
    setActivityList(updatedData);
  };

  const handleMenuClick = (type, id = -1, data = {}) => {
    if (type === 'add') setDialogTitle('Add New Activity');
    else if (type === 'edit') setDialogTitle('Edit Activity');
    else if (type === 'delete') setDialogTitle('Delete Current Activity?');
    const combinedData = {
      id,
      type,
      data
    };
    setDialogData(combinedData);
    setOpen(true);
  };
  const handleDialogClose = (data, id, type) => {
    if (type === 'add') {
      const newActivity = { ...data };
      newActivity.id = activityList.length - 1;
      setActivityList([...activityList, newActivity]);
    } else if (type === 'edit') {
      const updatedData = [...activityList];
      updatedData[id] = data;
      setActivityList(updatedData);
    } else if (type === 'delete') {
      if (data.deleteItem) {
        const updatedData = [...activityList];
        updatedData.splice(id, 1);
        setActivityList(updatedData);
      }
    }
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader title="Time Tracker" subheader="Track your day" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <TableContainer sx={{ overFlowX: 'scroll' }}>
          <Table>
            <Scrollbar sx={{ height: 360, width: 630 }}>
              <TimeTableHead headLabel={TABLE_HEAD} />
              <TableBody>
                {activityList.map((activity, id) => {
                  const { task, start, end, duration, quality } = activity;
                  return (
                    <TableRow hover key={id}>
                      <TableCell
                        align="left"
                        classes={{
                          root: classes.tableCell
                        }}
                      >
                        <TextField
                          classes={{ root: classes.taskField }}
                          id={`${id}_task`}
                          label="Task"
                          value={task}
                          onChange={handleFieldChange}
                          inputProps={{ 'data-name': `${id}-task` }}
                        />
                      </TableCell>
                      <TableCell
                        align="left"
                        classes={{
                          root: classes.tableCell
                        }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <MobileTimePicker
                            renderInput={(props) => (
                              <TextField classes={{ root: classes.timePicker }} {...props} />
                            )}
                            margin="normal"
                            id="time-picker"
                            label="Time picker"
                            value={start}
                            onChange={(date) => handleDateChange(date, 'start', id)}
                          />
                        </LocalizationProvider>
                      </TableCell>
                      <TableCell
                        align="left"
                        classes={{
                          root: classes.tableCell
                        }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <MobileTimePicker
                            renderInput={(props) => (
                              <TextField classes={{ root: classes.timePicker }} {...props} />
                            )}
                            margin="normal"
                            id="time-picker"
                            label="Time picker"
                            value={end}
                            onChange={(date) => handleDateChange(date, 'end', id)}
                          />
                        </LocalizationProvider>
                      </TableCell>
                      <TableCell
                        align="left"
                        classes={{
                          root: classes.tableCell
                        }}
                      >
                        <p>{duration}</p>
                      </TableCell>
                      <TableCell
                        align="left"
                        classes={{
                          root: classes.tableCell
                        }}
                      >
                        <Select
                          value={quality}
                          onChange={(e) => handleFieldChange(e, id, 'quality')}
                          displayEmpty
                          className={classes.selectEmpty}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="Amazing!">Amazing!</MenuItem>
                          <MenuItem value="Great">Great</MenuItem>
                          <MenuItem value="Good">Good</MenuItem>
                          <MenuItem value="Meh">Meh</MenuItem>
                          <MenuItem value="Bad">Bad</MenuItem>
                          <MenuItem value="Terrible">Terrible</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell
                        align="right"
                        classes={{
                          root: classes.tableCell
                        }}
                      >
                        <TimeMoreMenu id={id} data={activity} handleItemClick={handleMenuClick} />
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow style={{ height: '25px' }}>
                  <TableCell colSpan={6} />
                </TableRow>
              </TableBody>
            </Scrollbar>
          </Table>
        </TableContainer>
      </Box>
      <AppDataDialog
        open={open}
        title={dialogTitle}
        onClose={handleDialogClose}
        data={dialogData}
      />
    </Card>
  );
}
