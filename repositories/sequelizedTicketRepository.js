const Ticket = require("../models/sequelizedTicketModel");
const Utils = require("../Utils/utils");

class TicketRepository {

  /**
   * Creates a new ticket in the database.
   * @param {Ticket} ticket - The ticket object to be created.
   * @param {string} ticket.status - The status of the ticket (e.g., 'active', 'expired').
   * @param {string} ticket.seatNumber - The seat number associated with the ticket.
   * @param {string} ticket.purchaseDate - The purchase date of the ticket.
   * @param {string} ticket.expiryDate - The expiry date of the ticket.
   * @param {string} ticket.qrCode - The QR code for the ticket.
   * @param {number} ticket.sectionId - The ID of the section associated with the ticket.
   * @param {number} ticket.userId - The ID of the user who purchased the ticket.
   * @param {number} ticket.eventId - The ID of the event associated with the ticket.
   * @returns {Promise<Ticket>} The created ticket object.
   */
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

  /**
   * Updates an existing ticket in the database.
   * @param {Ticket} ticket - The ticket object to be updated.
   * @param {string} ticket.status - The status of the ticket.
   * @param {string} ticket.seatNumber - The seat number associated with the ticket.
   * @param {string} ticket.purchaseDate - The purchase date of the ticket.
   * @param {string} ticket.expiryDate - The expiry date of the ticket.
   * @param {string} ticket.qrCode - The QR code for the ticket.
   * @param {number} ticket.sectionId - The ID of the section associated with the ticket.
   * @param {number} ticket.userId - The ID of the user who purchased the ticket.
   * @param {number} ticket.eventId - The ID of the event associated with the ticket.
   * @returns {Promise<number>} The number of updated rows.
   */
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

  /**
   * Deletes a ticket from the database.
   * @param {number} id - The ID of the ticket to be deleted.
   * @returns {Promise<number>} The number of deleted rows.
   */
  static async delete(id) {
    try {
      return await Ticket.destroy({ where: { ticket_id: id } });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves all tickets from the database.
   * @returns {Promise<Array>} A list of all tickets.
   */
  static async readAll() {
    try {
      return await Ticket.findAll();
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves a ticket by its ID.
   * @param {number} id - The ID of the ticket to be fetched.
   * @returns {Promise<Ticket|null>} The ticket object if found, or null if not found.
   */
  static async readTicketById(id) {
    try {
      return await Ticket.findByPk(id);
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves tickets by their status.
   * @param {string} status - The status of the ticket(s) to be fetched.
   * @returns {Promise<Array>} A list of tickets matching the status.
   */
  static async readTicketByStatus(status) {
    try {
      return await Ticket.findAll({ where: { ticket_status: status } });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Checks if a ticket exists by its ID.
   * @param {number} id - The ID of the ticket to check.
   * @returns {Promise<boolean>} `true` if the ticket exists, otherwise `false`.
   */
  static async isTicketExistById(id) {
    try {
      const ticket = await Ticket.findByPk(id);
      return ticket !== null;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Checks if a ticket exists by its status.
   * @param {string} status - The status of the ticket to check.
   * @returns {Promise<boolean>} `true` if the ticket exists, otherwise `false`.
   */
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
