const db = require('../config/db');
const Ticket = require('../models/ticketModel');
const Utils = require('../Utils/utils');
class TicketRepository{

    static async create(ticket){
        try{
            let sql = `INSERT INTO ticket
            (ticket_status, seat_number, purchase_date, expiry_date, qr_code, section_id, user_id, event_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const expiryDateFormatted = await Utils.formatDateSQL(ticket.expiryDate);
            const purchaseDateFormatted = await Utils.formatDateSQL(ticket.purchaseDate);
            const {affectedRows, insertId} =
            await db.query(sql, [ticket.status, ticket.seatNumber, purchaseDateFormatted, expiryDateFormatted,
                ticket.qrCode, ticket.sectionId, ticket.userId, ticket.eventId]); 
            return {
                affectedRows, 
                //insertId
            }
        }catch(err){
            throw new Error(err);
        }
    }

    static async update(ticket){
        try{
            let sql = `UPDATE ticket
            SET ticket_status = ?, seat_number = ?, purchase_date = ?, expiry_date = ?, qr_code = ?,
            section_id = ?, user_id = ?, event_id = ?
            WHERE ticket_id = ?`;
            const expiryDateFormatted = await Utils.formatDateSQL(ticket.expiryDate);
            const purchaseDateFormatted = await Utils.formatDateSQL(ticket.purchaseDate);
            const {affectedRows} =
            await db.query(sql, [ticket.status, ticket.seatNumber, purchaseDateFormatted, expiryDateFormatted,
                ticket.qrCode, ticket.sectionId, ticket.userId, ticket.eventId, ticket.id]);
            return {affectedRows};
        }catch(err){
            throw new Error(err);
        }
    }

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

    static async readAll(){
        try{
            const rows = await db.query('SELECT * FROM ticket');
            return rows.map(Ticket.fromRow);
        }catch(err){
            throw new Error(err);
        }
    }

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

    static async isTicketExistById(id){
        try{
            let sql = `SELECT * FROM ticket WHERE ticket_id = ?`;
            const rows = await db.query(sql, [id]);
            return rows.length > 0;
        }catch(err){
            throw new Error(err);
        }
    }

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