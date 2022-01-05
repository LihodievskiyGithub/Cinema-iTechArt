import axios from "./ajax";
const baseUrl = "http://localhost:3000/api";


async function getTicketBySessionId(sessionId) {
  const response = await axios.get(`${baseUrl}/ticket/session/${sessionId}`);
  return response.data;
}

async function handleBuyTickets(data, sessionId) {
  const response = await axios.post(`${baseUrl}/ticket/buy/${sessionId}`, data);
  return response.data;
}

async function completePurchase(stripeSessionId) {
  const response = await axios.post(
    `${baseUrl}/ticket/complete_purchase`,
    {
      stripeSessionId,
    }
  );
  return response.data;
}

export default {
  getTicketBySessionId,
  handleBuyTickets,
  completePurchase,
};
