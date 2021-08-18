import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
import { makeStyles } from '@material-ui/styles';

// material
import {
  Box,
  Card,
  Checkbox,
  CardHeader,
  Typography,
  FormControlLabel,
  Stack
} from '@material-ui/core';
import Scrollbar from '../Scrollbar';
// ----------------------------------------------------------------------

const useStyles = makeStyles({
  card: {
    height: 350
  }
});

TaskItem.propTypes = {
  task: PropTypes.string,
  checked: PropTypes.bool,
  formik: PropTypes.object
};

function TaskItem({ task, checked, formik, ...other }) {
  const { getFieldProps } = formik;

  return (
    <Stack direction="row" justifyContent="space-between" sx={{ py: 0.75 }}>
      <FormControlLabel
        control={
          <Checkbox {...getFieldProps('checked')} value={task} checked={checked} {...other} />
        }
        label={
          <Typography
            variant="body2"
            sx={{
              ...(checked && {
                color: 'text.disabled',
                textDecoration: 'line-through'
              })
            }}
          >
            {task}
          </Typography>
        }
      />
    </Stack>
  );
}

AppTasks.propTypes = {
  tasks: PropTypes.array,
  title: PropTypes.string
};

export default function AppTasks({ tasks, title }) {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      checked: [tasks[2]]
    },
    onSubmit: (values) => {
      console.log(values);
    }
  });

  const { values, handleSubmit } = formik;

  return (
    <Card classes={{ root: classes.card }}>
      <CardHeader title={title} />
      <Box sx={{ px: 3, py: 1 }} className={classes.box}>
        <Scrollbar sx={{ height: 280 }}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              {tasks.map((task) => (
                <TaskItem
                  key={task}
                  task={task}
                  formik={formik}
                  checked={values.checked.includes(task)}
                />
              ))}
            </Form>
          </FormikProvider>
        </Scrollbar>
      </Box>
    </Card>
  );
}
