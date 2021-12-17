import axios from "axios";
const baseUrl = "http://localhost:3000/api";

async function addHall(data) {
  const response = await axios.post(`${baseUrl}/hall/add`, data);
  return response.data;
}

async function getHallById(id) {
  const response = await axios.get(`${baseUrl}/hall/${id}`);
  return response.data;
}

async function getHallsByCinemaId(cinemaId) {
    const response = await axios.get(`${baseUrl}/hall/cinema/${cinemaId}`);
    return response.data;
}

async function getHallBySessionId(sessionId) {
  const response = await axios.get(`${baseUrl}/hall/session/${sessionId}`);
  return response.data;
}

export default {
  getHallById,
  getHallsByCinemaId,
  getHallBySessionId,
  addHall,
};