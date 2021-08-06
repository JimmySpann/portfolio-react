const url = `${process.env.REACT_APP_API}/tasks`
const token = localStorage.getItem('token');

class TaskModel {
  static getAllTasks = () => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      }
    })
      .then((response) => response.json())
  }

  static getTaskById = (taskId) => {
    return fetch(`${url}/${taskId}`)
      .then((response) => response.json())
  }

  static createTask = (task) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify(task)
    })
      .then((response) => response.json())
  }
  
}



export default TaskModel
