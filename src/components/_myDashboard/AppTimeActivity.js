// material
import { useState } from 'react';
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
import USERLIST from '../../_mocks_/user';
import { UserListHead } from '../_dashboard/user';
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
  }
});

const TABLE_HEAD = [
  { id: 'task', label: 'Task', alignRight: false },
  { id: 'start', label: 'Start', alignRight: false },
  { id: 'end', label: 'End', alignRight: false },
  { id: 'duration', label: 'Duration', alignRight: false },
  { id: 'quality', label: 'Quality', alignRight: false },
  { id: '' }
];

export default function AppTimeActivity() {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  // const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  // const isUserNotFound = filteredUsers.length === 0;

  // const testData = [
  //   { task: 'Cook dinner', ''}
  // ]

  return (
    <Card>
      <CardHeader title="Time Tracker" subheader="Track your day" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <TableContainer sx={{ overFlowX: 'scroll' }}>
          <Table
            classes={{
              root: classes.table
            }}
          >
            <Scrollbar sx={{ height: 360, width: 630 }}>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={USERLIST.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {USERLIST.map((row) => {
                  const { id, name, role, status, company, isVerified } = row;
                  const isItemSelected = USERLIST.indexOf(name) !== -1;
                  return (
                    <TableRow
                      hover
                      key={id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          // onChange={(event) => handleClick(event, name)}
                        />
                      </TableCell> */}
                      <TableCell align="left">
                        <TextField
                          classes={{ root: classes.taskField }}
                          id={`${id}_task`}
                          label="Task"
                        />
                      </TableCell>
                      <TableCell align="left">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <TimePicker
                            renderInput={(props) => (
                              <TextField classes={{ root: classes.timePicker }} {...props} />
                            )}
                            margin="normal"
                            id="time-picker"
                            label="Time picker"
                            // value={selectedDate}
                            // onChange={handleDateChange}
                          />
                        </LocalizationProvider>
                      </TableCell>
                      <TableCell align="left">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <TimePicker
                            renderInput={(props) => (
                              <TextField classes={{ root: classes.timePicker }} {...props} />
                            )}
                            margin="normal"
                            id="time-picker"
                            label="Time picker"
                            // value={selectedDate}
                            // onChange={handleDateChange}
                          />
                        </LocalizationProvider>
                      </TableCell>
                      <TableCell align="left">
                        <p>0:00:00</p>
                      </TableCell>
                      <TableCell align="left">
                        <Select
                          labelId="demo-simple-select-placeholder-label-label"
                          id="demo-simple-select-placeholder-label"
                          // value={age}
                          // onChange={handleChange}
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
                      <TableCell align="right">{/* <UserMoreMenu /> */}</TableCell>
                    </TableRow>
                  );
                })}
                {1 > 0 && (
                  <TableRow style={{ height: '500px' }}>
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
