import axios from "axios";
const baseUrl = "http://localhost:3000/api";

async function getTime() {
  const response = await axios.get(`${baseUrl}/time`);
  return response.data;
}

export default {
  getTime,
};
