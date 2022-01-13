// получаем фильмы с backend
import axios from "./ajax";
const baseUrl = "http://localhost:3000/api";

async function getSessions(movieId) {
  const response = await axios.get(`${baseUrl}/sessions`, {
    params: { movieId },
  });
  return response.data;
}

async function getSessionById(sessionId) {
  const response = await axios.get(`${baseUrl}/sessions/${sessionId}`)
  return response.data;
}

async function addSession(data) {
  const response = await axios.post(`${baseUrl}/sessions/add`, data);
  return response.data;
}

async function deleteSession(sessionId) {
  const response = await axios.delete(
    `${baseUrl}/sessions/delete/${sessionId}`
  );
  return response.data;
}


export default {
  addSession,
  getSessions,
  deleteSession,
  getSessionById,
};
