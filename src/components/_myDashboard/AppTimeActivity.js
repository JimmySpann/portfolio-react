// material
import { useState } from 'react';
import PropTypes from 'prop-types';
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
import TimePicker from '@material-ui/lab/TimePicker';
import Scrollbar from '../Scrollbar';
import UserMoreMenu from '../_dashboard/user/UserMoreMenu';
import UserListHead from '../_dashboard/user/UserListHead';

const columns = [
  {
    field: 'task',
    headerName: 'Task',
    width: 150,
    editable: true
  },
  {
    field: 'start',
    headerName: 'Start',
    width: 100,
    type: 'dateTime',
    editable: true
  },
  {
    field: 'end',
    headerName: 'end',
    type: 'dateTime',
    width: 100,
    editable: true
  },
  {
    field: 'duration',
    headerName: 'Duration',
    width: 100,
    editable: false
  },
  {
    field: 'quality',
    headerName: 'Quality',
    width: 100,
    editable: true,
    type: 'singleSelect'
  },
  {
    field: 'menu',
    headerName: 'Menu',
    width: 40,
    editable: false,
    sortable: false
  }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
];
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

export default function AppTimeActivity({ activities }) {
  const classes = useStyles();
  const [activityList, setActivityList] = useState(activities);

  const handleFieldChange = (e, idx = '', cusLabel = '') => {
    const updatedData = [...activityList];
    let id;
    let label;
    if (e.target.dataset) {
      [id, label] = e.target.dataset.name.split('-');
    } else if (idx !== '') {
      id = idx;
      label = cusLabel;
    }

    updatedData[id][label] = e.target.value;

    setActivityList(updatedData);
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

  const handleDateChange = (date, label, id) => {
    const updatedData = [...activityList];
    updatedData[id][label] = date;
    updatedData[id]['duration'] = timeDistance(updatedData[id]['end'], updatedData[id]['start']);
    setActivityList(updatedData);
  };

  return (
    <Card>
      <CardHeader title="Time Tracker" subheader="Track your day" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <TableContainer sx={{ overFlowX: 'scroll' }}>
          <Table>
            <Scrollbar sx={{ height: 360, width: 630 }}>
              <UserListHead headLabel={TABLE_HEAD} />
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
                          <TimePicker
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
                          <TimePicker
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
                        <UserMoreMenu />
                      </TableCell>
                    </TableRow>
                  );
                })}
                {1 > 0 && (
                  <TableRow style={{ height: '25px' }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Scrollbar>
            {false && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    {/* <SearchNotFound searchQuery={filterName} /> */}
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>
    </Card>
  );
}

AppTimeActivity.propTypes = {
  children: PropTypes.any,
  activities: PropTypes.object
};
