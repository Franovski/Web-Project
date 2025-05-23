const db = require('../config/db');
const Ticket = require('../models/ticketModel');
const Utils = require('../Utils/utils');
class TicketRepository{

    static async create(ticket){

        /**
     * Creates a new ticket in the database.
     * @param {Ticket} ticket - Ticket data.
     * @returns {Ticket} affectedRows count.
     */

        try{
            let sql = `INSERT INTO ticket
            (ticket_status, ticket_price, seat_number, purchase_date, expiry_date, qr_code, section_id, user_id, event_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const expiryDateFormatted = await Utils.formatDateSQL(ticket.expiryDate);
            const purchaseDateFormatted = await Utils.formatDateSQL(ticket.purchaseDate);
            const {affectedRows, insertId} =
            await db.query(sql, [ticket.status, ticket.price, ticket.seatNumber, purchaseDateFormatted, expiryDateFormatted,
                ticket.qrCode, ticket.sectionId, ticket.userId, ticket.eventId]); 
            return {
                affectedRows, 
                //insertId
            }
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Updates an existing ticket in the database.
     * @param {Ticket} ticket - Ticket data with updated values.
     * @returns {Ticket} affectedRows count.
     */

    static async update(ticket){
        try{
            let sql = `UPDATE ticket
            SET ticket_status = ?, ticket_price = ?, seat_number = ?, purchase_date = ?, expiry_date = ?, qr_code = ?,
            section_id = ?, user_id = ?, event_id = ?
            WHERE ticket_id = ?`;
            const expiryDateFormatted = await Utils.formatDateSQL(ticket.expiryDate);
            const purchaseDateFormatted = await Utils.formatDateSQL(ticket.purchaseDate);
            const {affectedRows} =
            await db.query(sql, [ticket.status, ticket.price, ticket.seatNumber, purchaseDateFormatted, expiryDateFormatted,
                ticket.qrCode, ticket.sectionId, ticket.userId, ticket.eventId, ticket.id]);
            return {affectedRows};
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Deletes a ticket by its ID.
     * @param {number} id - Ticket ID.
     * @returns {Ticket} affectedRows count.
     */

    static async delete(id){
        try{
            let sql = `DELETE FROM ticket
            WHERE ticket_id = ?`;

            const {affectedRows} = await db.query(sql, [id]);
            return {affectedRows};
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Reads all tickets from the database.
     * @returns {Array} List of all tickets.
     */

    static async readAll(){
        try{
            const rows = await db.query('SELECT * FROM ticket');
            return rows.map(Ticket.fromRow);
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Reads a ticket by its ID.
     * @param {number} id - Ticket ID.
     * @returns {Ticket} Ticket object.
     */

    static async readTicketById(id){
        try{
            let sql = `SELECT * FROM ticket
            WHERE ticket_id = ?`;
            const rows = await db.query(sql, [id]);
            return Ticket.fromRow(rows[0]);
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Reads tickets by status.
     * @param {string} status - Ticket status.
     * @returns {Array} List of matching tickets.
     */

    static async readTicketByStatus(status){
        try{
            let sql = `SELECT * FROM ticket
            WHERE ticket_status = ?`;
            const rows = await db.query(sql, [status]);
            return rows.map(row => Ticket.fromRow(row));
        }catch(err){
            throw new Error(err);
        }
    }

    static async readTicketByEventId(eventId){
        try{
            let sql = `SELECT * FROM ticket WHERE event_id = ?`;
            const rows = await db.query(sql, [eventId]);
            return rows.map(row => Ticket.fromRow(row));
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Checks if a ticket exists by ID.
     * @param {number} id - Ticket ID.
     * @returns {boolean} True if ticket exists, else false.
     */

    static async isTicketExistById(id){
        try{
            let sql = `SELECT * FROM ticket WHERE ticket_id = ?`;
            const rows = await db.query(sql, [id]);
            return rows.length > 0;
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Checks if any ticket exists with a given status.
     * @param {string} status - Ticket status.
     * @returns {boolean} True if tickets with the status exist, else false.
     */

    static async isTicketExistByStatus(status){
        try{
            let sql = `SELECT * FROM ticket WHERE ticket_status = ?`;
            const rows = await db.query(sql, [status]);
            return rows.length > 0;
        }catch(err){
            throw new Error(err);
        }
    }
}

module.exports = TicketRepository;