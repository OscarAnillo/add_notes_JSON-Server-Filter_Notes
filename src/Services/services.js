import axios from "axios";
const baseURL = "http://localhost:3001/notes";

//CRUD

/* Create */
export const createNewNote = async (newNote) => {
    const res = await axios.post(baseURL, newNote);
    return res.data;
}

/* Read */
export const getAllNotes = async () => {
    const response = await axios.get(baseURL);
    return response.data
}

/* Update */
export const updateNote = async (id, update) => {
    const res = await axios.patch(`${baseURL}/${id}`, update);
    return res.data
}

/* Delete */
export const deleteService = (id) => {
    const res = axios.delete(`${baseURL}/${id}`);
    return res.data;
}