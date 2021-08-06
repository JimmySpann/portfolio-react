import { useEffect, useState } from 'react';
// material
import { Button, Container, Typography } from '@material-ui/core';
// components
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { createEventId } from '../components/_dashboard/schedule/event-utils';
import Page from '../components/Page';
import EditEventDialog from '../components/_dashboard/schedule/EditEventDialog/EditEventDialog';

import EventModel from '../models/event';
import debugLog from '../utils/customDebugging';

// ----------------------------------------------------------------------

export default function Schedule() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [displayedEvents, setDisplayedEvents] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Toes');

  // ComponentDidMount
  useEffect(() => {
    EventModel.getAll()
      .then((result) => setDisplayedEvents(result))
      .catch((error) => debugLog('event error', error));
  }, []);

  // Dialog Controls
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  // Calendar Controls
  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = (selectInfo) => {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      const event = {
        id: createEventId(),
        title,
        start: selectInfo.start,
        end: selectInfo.end,
        allDay: selectInfo.allDay
      };
      debugLog('createdEvent', event);
      debugLog('selectInfo', selectInfo);

      EventModel.create(event)
        .then((newEvent) => {
          debugLog('RES', newEvent);
          calendarApi.addEvent(newEvent);
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  };

  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      const id = clickInfo.event.extendedProps._id;
      EventModel.delete({ _id: id })
        .then((deletedEvent) => {
          clickInfo.event.remove();
          setDisplayedEvents(displayedEvents.filter((event) => event._id !== deletedEvent._id)); // Got to be a better way. Fix later
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  };

  // Test for displayedEvents
  useEffect(() => {
    debugLog('displayedEvents', displayedEvents);
  }, [displayedEvents]);

  // handleEvents = (events) => {
  //   this.setState({
  //     displayedEvents: events
  //   })
  // }

  // Render custom components
  function renderSidebar() {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        {/* <div className="demo-app-sidebar-section">
          {// eslint-disable-next-line jsx-a11y/label-has-associated-control}
          <label>
            <input type="checkbox" checked={weekendsVisible} onChange={handleWeekendsToggle} />
            toggle weekends
          </label>
        </div> */}
        <div className="demo-app-sidebar-section">
          <h2>All Events ({displayedEvents.length})</h2>
          <ul>{/* {this.state.displayedEvents.map(renderSidebarEvent)} */}</ul>
        </div>
      </div>
    );
  }

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  function renderSidebarEvent(event) {
    return (
      <li key={event._id}>
        <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
        <i>{event.title}</i>
      </li>
    );
  }

  return (
    <Page title="Schedule | Sage-Space">
      <Container>
        <div className="demo-app">
          {renderSidebar()}
          <div className="demo-app-main">
            <div>
              <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
              <br />
              <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open simple dialog
              </Button>
              <EditEventDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
            </div>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              initialView="dayGridMonth"
              contentHeight="auto"
              editable
              selectable
              selectMirror
              dayMaxEvents
              weekends={weekendsVisible}
              events={displayedEvents}
              select={handleDateSelect}
              eventContent={renderEventContent} // custom render function
              eventClick={handleEventClick}
              // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
              // you can update a remote database when these fire:
              // eventAdd={function(){}}
              // eventChange={function(){}}
              // eventRemove={function(){}}
            />
          </div>
        </div>
      </Container>
    </Page>
  );
}
