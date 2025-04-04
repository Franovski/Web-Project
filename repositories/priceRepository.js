const db = require('../config/db');
const Price = require('../models/priceModel');

class PriceRepository{

    /**
     * Create a new price entry in the database
     * @param {Price} price - The price object
     * @returns {Price} - Result of the insert query
     */

    static async create(price){
        try{
            let sql = `INSERT INTO price
            (ticket_price, event_id, section_id)
            VALUES (?, ?, ?)`;

            const {affectedRows, insertId} =
            await db.query(sql, [price.ticketPrice, price.eventId, price.sectionId]); 
            return {
                affectedRows, 
                //insertId
            }
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Update a price entry in the database
     * @param {Price} price - The price object to update
     * @returns {Price} - Result of the update query
     */

    static async update(price){
        try{
            let sql = `UPDATE price
            SET ticket_price = ?, event_id = ?, section_id = ?
            WHERE price_id = ?`;

            const {affectedRows} =
            await db.query(sql, [price.ticketPrice, price.eventId, price.sectionId, price.id]);
            return {affectedRows};
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Delete a price entry from the database
     * @param {number} id - The ID of the price to delete
     * @returns {Price} - Result of the delete query
     */

    static async delete(id){
        try{
            let sql = `DELETE FROM price
            WHERE price_id = ?`;

            const {affectedRows} = await db.query(sql, [id]);
            return {affectedRows};
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Read all price entries from the database
     * @returns {Array} - List of all price entries
     */

    static async readAll(){
        try{
            const rows = await db.query('SELECT * FROM price');
            return rows.map(Price.fromRow);
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Read a price entry by its ID
     * @param {number} id - The ID of the price
     * @returns {Price} - The price object
     */

    static async readPriceById(id){
        try{
            let sql = `SELECT * FROM price
            WHERE price_id = ?`;
            const rows = await db.query(sql, [id]);
            return Price.fromRow(rows[0]);
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Check if a price entry exists by its ID
     * @param {number} id - The ID to check
     * @returns {boolean} - True if exists, otherwise false
     */

    static async isPriceExistById(id){
        try{
            let sql = `SELECT * FROM price WHERE price_id = ?`;
            const rows = await db.query(sql, [id]);
            return rows.length > 0;
        }catch(err){
            throw new Error(err);
        }
    }
}

module.exports = PriceRepository;