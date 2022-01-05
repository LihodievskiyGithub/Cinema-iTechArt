import axios from "./ajax";
const baseUrl = "http://localhost:3000/api";



async function getCinemas(filters) {
  const response = await axios.get(`${baseUrl}/cinema`, {
    params: { ...filters },
  });
  return response.data;
}

export default {
  getCinemas,
};