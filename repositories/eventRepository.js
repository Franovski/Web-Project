const db = require('../config/db');
const Event = require('../models/eventModel');
const Utils = require('../Utils/utils');

class EventRepository{

    /**
     * Creates a new event in the database.
     * @param {Event} event - The event object.
     * @returns {Event} - Affected rows and insert ID.
     */

    static async create(event){
        try{
            let sql = `INSERT INTO event
            (event_name, event_date, event_time, event_location, event_capacity, event_status, 
            event_description, event_image, category_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const dateFormatted = await Utils.formatDateSQL(event.date);
            const timeFormatted =  await Utils.formatTimeSQL(event.time);
            const {affectedRows, insertId} =
            await db.query(sql, [event.name, dateFormatted, timeFormatted, event.location,
                event.capacity, event.status, event.description, event.image, event.categoryId]); 
                return {
                affectedRows, 
                //insertId
            }
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Updates an existing event in the database.
     * @param {Event} event - The event object.
     * @returns {Event} - Affected rows.
     */

    static async update(event){
        try{
            let sql = `UPDATE event SET
            event_name = ?, event_date = ?, event_time = ?, event_location = ?, event_capacity = ?,
            event_status = ?, event_description = ?, event_image = ?, category_id = ?
            WHERE event_id = ?`;
            const dateFormatted = await Utils.formatDateSQL(event.date);
            const timeFormatted = await Utils.formatTimeSQL(event.time);
            const {affectedRows} =
            await db.query(sql, [event.name, dateFormatted, timeFormatted, event.location,
                event.capacity, event.status, event.description, event.image, event.categoryId, event.id]);
            return {affectedRows};
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Deletes an event by ID.
     * @param {number} id - The event ID.
     * @returns {Event} - Affected rows.
     */

    static async delete(id){
        try{
            let sql = `DELETE FROM event
            WHERE event_id = ?`;

            const {affectedRows} = await db.query(sql, [id]);
            return {affectedRows};
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Reads all events.
     * @returns {Array} - List of all events.
     */

    static async readAll(){
        try{
            const rows = await db.query('SELECT * FROM event');
            return rows.map(Event.fromRow);
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Reads a specific event by ID.
     * @param {number} id - Event ID.
     * @returns {Event} - Event object.
     */

    static async readEventById(id){
        try{
            let sql = `SELECT * FROM event
            WHERE event_id = ?`;
            const rows = await db.query(sql, [id]);
            return Event.fromRow(rows[0]);
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Reads events by name.
     * @param {string} name - Event name.
     * @returns {Array} - Matching events.
     */

    static async readEventByName(name){
        try{
            let sql = `SELECT * FROM event
            WHERE event_name = ?`;
            const rows = await db.query(sql, [name]);
            return rows.map(row => Event.fromRow(row));
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Reads events by status.
     * @param {string} status - Event status.
     * @returns {Array} - Matching events.
     */

    static async readEventByStatus(status){
        try{
            let sql = `SELECT * FROM event
            WHERE event_status = ?`;
            const rows = await db.query(sql, [status]);
            return rows.map(row => Event.fromRow(row));
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Reads events by category ID.
     * @param {number} categoryId - Category ID.
     * @returns {Array} - Matching events.
     */

    static async readEventByCategoryId(categoryId){
        try{
            let sql = `SELECT * FROM event
            WHERE category_id = ?`;
            const rows = await db.query(sql, [categoryId]);
            return rows.map(row => Event.fromRow(row));
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Reads the date of an event by ID.
     * @param {number} id - Event ID.
     * @returns {string} - Event date.
     */

    static async readEventDateById(id){
        try{
            let sql = `SELECT event_date FROM event WHERE event_id = ?`;
            const rows = await db.query(sql, [id]);
            return rows[0].event_date;
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Checks if an event exists by ID.
     * @param {number} id - Event ID.
     * @returns {boolean} - True if exists, false otherwise.
     */

    static async isEventExistById(id){
        try{
            let sql = `SELECT * FROM event WHERE event_id = ?`;
            const rows = await db.query(sql, [id]);
            return rows.length > 0 ;
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Checks if an event exists by name.
     * @param {string} name - Event name.
     * @returns {boolean} - True if exists, false otherwise.
     */

    static async isEventExistByName(name){
        try{
            let sql = `SELECT * FROM event WHERE event_name = ?`;
            const rows = await db.query(sql, [name]);
            return rows.length > 0;
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Checks if an event exists by status.
     * @param {string} status - Event status.
     * @returns {boolean} - True if exists, false otherwise.
     */

    static async isEventExistByStatus(status){
        try{
            let sql = `SELECT * FROM event WHERE event_status = ?`;
            const rows = await db.query(sql, [status]);
            return rows.length > 0;
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Checks if an event exists by category ID.
     * @param {number} categoryId - Category ID.
     * @returns {boolean} - True if exists, false otherwise.
     */

    static async isEventExistByCategoryId(categoryId){
        try{
            let sql = `SELECT * FROM event WHERE category_id = ?`;
            const rows = await db.query(sql, [categoryId]);
            return rows.length > 0;
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Checks if an event date exists by event ID.
     * @param {number} id - Event ID.
     * @returns {boolean} - True if exists, false otherwise.
     */

    static async isEventDateExistById(id){
        try{
            let sql = `SELECT event_date FROM event WHERE event_id = ?`;
            const rows = await db.query(sql, [id]);
            return rows.length > 0;
        }catch(err){
            throw new Error(err);
        }
    }
}

module.exports = EventRepository;