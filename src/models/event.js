// import debugLog from "../utils/customDebugging";

const url = `${process.env.REACT_APP_API}/events`;
const token = localStorage.getItem('token');

class EventModel {
  static getAll = () =>
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      }
    }).then((response) => response.json());

  static getById = (eventID) =>
    fetch(`${url}/${eventID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      }
    }).then((response) => response.json());

  static create = (event) =>
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify(event)
    }).then((response) => response.json());

  static update = (event) =>
    fetch(`${url}/${event._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify(event)
    }).then((response) => response.json());

  static delete = (event) =>
    fetch(`${url}/${event._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      }
    }).then((response) => response.json());
}

export default EventModel;
