const db = require('../config/db');
const Event = require('../models/eventModel');
const Utils = require('../Utils/utils');

class EventRepository{

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

    static async readAll(){
        try{
            const rows = await db.query('SELECT * FROM event');
            return rows.map(Event.fromRow);
        }catch(err){
            throw new Error(err);
        }
    }

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

    static async isEventExistById(id){
        try{
            let sql = `SELECT * FROM event WHERE event_id = ?`;
            const rows = await db.query(sql, [id]);
            return rows.length > 0;
        }catch(err){
            throw new Error(err);
        }
    }

    static async isEventExistByName(name){
        try{
            let sql = `SELECT * FROM event WHERE event_name = ?`;
            const rows = await db.query(sql, [name]);
            return rows.length > 0;
        }catch(err){
            throw new Error(err);
        }
    }

    static async isEventExistByStatus(status){
        try{
            let sql = `SELECT * FROM event WHERE event_status = ?`;
            const rows = await db.query(sql, [status]);
            return rows.length > 0;
        }catch(err){
            throw new Error(err);
        }
    }
}

module.exports = EventRepository;