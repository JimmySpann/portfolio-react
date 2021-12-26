const url = `${process.env.REACT_APP_API}/lists`;
const token = localStorage.getItem('token');

class ListModel {
  static getAllLists = () =>
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      }
    }).then((response) => response.json());

  static getListById = (listId) =>
    fetch(`${url}/${listId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      }
    }).then((response) => response.json());

  static createList = (list) =>
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify(list)
    }).then((response) => response.json());
}

export default ListModel;
