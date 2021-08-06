const url = `${process.env.REACT_APP_API}/notes`;
const token = localStorage.getItem('token');

class NoteModel {
  static getAllNotes = async () => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      }
    });
    return response.json();
  };

  static getNoteById = async (noteId) => {
    const response = await fetch(`${url}/${noteId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      }
    });
    return response.json();
  };

  static createNote = async (note) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify(note)
    });
    return response.json();
  };

  static updateNote = async (note) => {
    const response = await fetch(`${url}/${note._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify(note)
    });
    return response.json();
  };

  static deleteNote = async (note) => {
    const response = await fetch(`${url}/${note._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      }
    });
    return response.json();
  };
}

export default NoteModel;
