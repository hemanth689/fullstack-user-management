import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export function deleteData(userEmail) {
  return axios.delete(`${API_URL}/users/${userEmail}`);
}

export function updateData(email, username) {
  return axios.patch(`${API_URL}/users/${email}`, {username});
}
