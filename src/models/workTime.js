const url = `${process.env.REACT_APP_API}/work-time`
const token = localStorage.getItem('token');

class WorkTimeModel {
  static getAllWorkTime = () => {
    console.log(url);
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      }
    })
      .then((response) => response.json())
  }

  static getWorkTimeById = (noteId) => {
    return fetch(`${url}/${noteId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      }
    })
      .then((response) => response.json())
  }

  static createWorkTime = (note) => {
    console.log("1", note)
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify(note)
    })
      .then((response) => {response.json(); console.log("2", response)})
  }

  static updateWorkTime = (note) => {
    return fetch(`${url}/${note._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify(note)
    })
      .then((response) => response.json())
  }

  static deleteWorkTime = (note) => {
    return fetch(`${url}/${note._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      }
    })
      .then((response) => response.json())
  }

}



export default WorkTimeModel
