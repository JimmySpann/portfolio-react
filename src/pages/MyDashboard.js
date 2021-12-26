import { useEffect, useState } from 'react';
// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import AppTasks from '../components/_myDashboard/AppTasks';
import AppTimeActivity from '../components/_myDashboard/AppTimeActivity';
import AppThoughtTracker from '../components/_myDashboard/AppThoughtTracker';
import NoteModel from '../models/note';
import ListModel from '../models/list';
import TaskModel from '../models/task';

// ----------------------------------------------------------------------

const TOP_THOUGHTS = [
  "1. In order to feel fulfillment. I must do the difficult things I need to do but don't want to do",
  '2. I need to build my network, improve my focus, development my character, and keep programming',
  "3. i am working towards an incredible life. Never forget that and you won't get distracted",
  '4. I will keep my hourly alarm on'
];

const GOALS = [
  'Practice visualizing your life in a year from now',
  'Work on sage-space for 2 hours',
  'Reach out to 5 people who work at a consultancy agency',
  'Write first cover letter'
];

// const HABITS = [
//   'Code',
//   'Linkedin Post',
//   'Visualization',
//   'Networking',
//   'Character Dev',
//   'Read Mission'
// ];

const TIME_ACTIVITIES = [
  {
    id: 1,
    task: 'Cook dinner',
    start: new Date('August 6, 2021 16:14:00'),
    end: new Date('August 6, 2021 16:50:00'),
    duration: '00:36:00',
    quality: 'Good'
  },
  {
    id: 2,
    task: 'Eat cheese',
    start: new Date('August 6, 2021 16:50:00'),
    end: new Date('August 6, 2021 17:15:00'),
    duration: '00:25:00',
    quality: 'Meh'
  },
  {
    id: 3,
    task: 'Code',
    start: new Date('August 6, 2021 17:15:00'),
    end: new Date('August 6, 2021 18:15:00'),
    duration: '01:00:00',
    quality: 'Great'
  },
  {
    id: 4,
    task: 'Play Games',
    start: new Date('August 6, 2021 17:15:00'),
    end: new Date('August 6, 2021 19:15:00'),
    duration: '01:00:00',
    quality: 'Bad'
  },
  {
    id: 5,
    task: 'Flick boogers on by-passers',
    start: new Date('August 6, 2021 19:15:00'),
    end: new Date('August 6, 2021 20:00:00'),
    duration: '00:45:00',
    quality: 'Amazing!'
  },
  {
    id: 6,
    task: 'Nap',
    start: new Date('August 6, 2021 20:00:00'),
    end: new Date('August 6, 2021 20:15:00'),
    duration: '00:15:00',
    quality: 'Meh'
  },
  {
    id: 7,
    task: 'Smoke Crack',
    start: new Date('August 6, 2021 20:15:00'),
    end: new Date('August 6, 2021 20:30:00'),
    duration: '00:15:00',
    quality: 'Great'
  },
  {
    id: 8,
    task: 'Talk to Corporate',
    start: new Date('August 6, 2021 20:30:00'),
    end: new Date('August 6, 2021 20:50:00'),
    duration: '00:20:00',
    quality: 'Good'
  },
  {
    id: 9,
    task: 'Approve Memos',
    start: new Date('August 6, 2021 20:50:00'),
    end: new Date('August 6, 2021 21:10:00'),
    duration: '00:20:00',
    quality: 'Good'
  }
];

export default function MyDashboardApp() {
  const [habits, setHabits] = useState({ tasks: [{ name: 'test' }] });

  useEffect(() => {
    ListModel.getListById('61c8c3dfcc6f504de0a35e56')
      .then((result) => {
        setHabits(result);
        console.log('result', result);
      })
      .catch((error) => console.log('You messed up, dumbass', error));
  }, []);

  useEffect(() => {
    // NoteModel.getAllNotes()
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((err) => console.log(err));
    // TaskModel.createTask({
    //   name: 'Code',
    //   list: '61c8c3dfcc6f504de0a35e56',
    // })
    // .then((result) => console.log('Congrats!', result))
    // .catch((error) => console.log('You messed up, dumbass', error));
    // ListModel.getListById('61c8c3dfcc6f504de0a35e56')
    //   .then((result) => {
    //     setHabits(result);
    //     console.log(habits);
    //   })
    //   .catch((error) => console.log('You messed up, dumbass', error));
    console.log('habits', habits);
  }, [habits]);

  return (
    <Page title="Dashboard | Sage-Space">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={5}>
            <AppTasks tasks={TOP_THOUGHTS} title="Top Thoughts" />
          </Grid>

          <Grid item xs={12} md={6} lg={5}>
            <AppTasks tasks={GOALS} title="Goals" />
          </Grid>

          <Grid item xs={12} md={6} lg={2}>
            <AppTasks tasks={habits.tasks} title={habits.name} />
          </Grid>

          <Grid item xs={12} md={7} lg={7}>
            <AppTimeActivity activities={TIME_ACTIVITIES} />
          </Grid>

          <Grid item xs={12} md={5} lg={5}>
            <AppThoughtTracker />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
