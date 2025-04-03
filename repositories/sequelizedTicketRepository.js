const Ticket = require("../models/sequelizedTicketModel");
const Utils = require("../Utils/utils");

class TicketRepository {
  static async create(ticket) {
    try {
      const addedTicket = await Ticket.create({
        ticket_status: ticket.status,
        seat_number: ticket.seatNumber,
        purchase_date: Utils.formatDateSQL(ticket.purchaseDate),
        expiry_date: Utils.formatDateSQL(ticket.expiryDate),
        qr_code: ticket.qrCode,
        section_id: ticket.sectionId,
        user_id: ticket.userId,
        event_id: ticket.eventId,
      });
      return addedTicket;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async update(ticket) {
    try {
      const [updated] = await Ticket.update(
        {
          ticket_status: ticket.status,
          seat_number: ticket.seatNumber,
          purchase_date: Utils.formatDateSQL(ticket.purchaseDate),
          expiry_date: Utils.formatDateSQL(ticket.expiryDate),
          qr_code: ticket.qrCode,
          section_id: ticket.sectionId,
          user_id: ticket.userId,
          event_id: ticket.eventId,
        },
        {
          where: { ticket_id: ticket.id },
        }
      );
      return updated;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async delete(id) {
    try {
      return await Ticket.destroy({ where: { ticket_id: id } });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async readAll() {
    try {
      return await Ticket.findAll();
    } catch (err) {
      throw new Error(err);
    }
  }

  static async readTicketById(id) {
    try {
      return await Ticket.findByPk(id);
    } catch (err) {
      throw new Error(err);
    }
  }

  static async readTicketByStatus(status) {
    try {
      return await Ticket.findAll({ where: { ticket_status: status } });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async isTicketExistById(id) {
    try {
      const ticket = await Ticket.findByPk(id);
      return ticket !== null;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async isTicketExistByStatus(status) {
    try {
      const ticket = await Ticket.findOne({ where: { ticket_status: status } });
      return ticket !== null;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = TicketRepository;
