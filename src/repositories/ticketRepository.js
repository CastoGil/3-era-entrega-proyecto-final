import { ticketDAO } from "../Dao/ticket/ticketDao.js";

export const ticketRepository = {
  createTicket: async (purchaser, amount) => {
    return await ticketDAO.createTicket(purchaser, amount);
  },
};
