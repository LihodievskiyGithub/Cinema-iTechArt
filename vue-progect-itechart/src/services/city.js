import axios from "axios";
const baseUrl = "http://localhost:3000/api";

async function getCity() {
  const response = await axios.get(`${baseUrl}/city`);
  return response.data;
}


export default {
  getCity,
};
