const db = require('../config/db');
const Price = require('../models/priceModel');

class PriceRepository{

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

    static async readAll(){
        try{
            const rows = await db.query('SELECT * FROM price');
            return rows.map(Price.fromRow);
        }catch(err){
            throw new Error(err);
        }
    }

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