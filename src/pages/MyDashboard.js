import { useEffect, useState } from 'react';
// material
import { Box, Grid, Container, Typography, Button } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';
import AppTimeActivity from '../components/_myDashboard/AppTimeActivity';
import AppThoughtTracker from '../components/_myDashboard/AppThoughtTracker';
import NoteModel from '../models/note';
import AppDataDialog from '../components/_myDashboard/AppDataDialog';

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

const HABITS = [
  'Code',
  'Linkedin Post',
  'Visualization',
  'Networking',
  'Character Dev',
  'Read Mission'
];

export default function MyDashboardApp() {
  useEffect(() => {
    console.log('My Dashboard did mount');
    NoteModel.getAllNotes()
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }, []);
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <Page title="Dashboard | Sage-Space">
      <Button onClick={handleDialogOpen}>Click for Dialog</Button>
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
            <AppTasks tasks={HABITS} title="Habits" />
          </Grid>

          <Grid item xs={12} md={7} lg={7}>
            <AppTimeActivity />
          </Grid>

          <Grid item xs={12} md={5} lg={5}>
            <AppThoughtTracker />
          </Grid>
        </Grid>
      </Container>
      <AppDataDialog open={open} title="Edit Time Activity" onClose={handleDialogClose} />
    </Page>
  );
}
