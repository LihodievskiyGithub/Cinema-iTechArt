// получаем фильмы с backend
import axios from 'axios'
const baseUrl = "http://localhost:3000/api";

async function getMovies(params) {
  const response = await axios.get(`${baseUrl}/movies`, {
    params: { ...params },
  });
  return response.data;
}

async function getMovieById(id) {
    const response = await axios.get(`${baseUrl}/movies/${id}`);
    return response.data;
}

async function addMovie(data) {
  const response = await axios.post(`${baseUrl}/movies/add`, data);
  return response.data
}

async function deleteMovie(id) {
  const response = await axios.delete(`${baseUrl}/movies/delete/${id}`);
  return response.data
}

async function updateMovie(id, data) {
  const response = await axios.put(
    `${baseUrl}/movies/update/${id}`,
    data
  );
  return response.data;
}



export default {
  updateMovie,
  deleteMovie,
  addMovie,
  getMovies,
  getMovieById
};