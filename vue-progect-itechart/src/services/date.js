import axios from "axios";
const baseUrl = "http://localhost:3000/api";

async function getDate() {
  const response = await axios.get(`${baseUrl}/date`);
  return response.data;
}

export default {
  getDate,
};
