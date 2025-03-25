const db = require('../config/db');
const Section = require('../models/sectionModel');

class SectionRepository{

    static async create(section){
        try{
            let sql = `INSERT INTO section
            (section_name, row_count, seat_count, section_status, event_id)
            VALUES (?, ?, ?, ?, ?)`;

            const {affectedRows, insertId} =
            await db.query(sql, [section.name, section.rowCount, section.seatCount,
                section.status, section.eventId]); 
            return {
                affectedRows, 
                //insertId
            }
        }catch(err){
            throw new Error(err);
        }
    }

    static async update(section){
        try{
            let sql = `UPDATE section
            SET section_name = ?, row_count = ?, seat_count = ?, section_status = ?, event_id = ?
            WHERE section_id = ?`;

            const {affectedRows} =
            await db.query(sql, [section.name, section.rowCount, section.seatCount,
                section.status, section.eventId, section.id]);
            return {affectedRows};
        }catch(err){
            throw new Error(err);
        }
    }

    static async delete(id){
        try{
            let sql = `DELETE FROM section
            WHERE section_id = ?`;

            const {affectedRows} = await db.query(sql, [id]);
            return {affectedRows};
        }catch(err){
            throw new Error(err);
        }
    }

    static async readAll(){
        try{
            const rows = await db.query('SELECT * FROM section');
            return rows.map(Section.fromRow);
        }catch(err){
            throw new Error(err);
        }
    }

    static async readSectionById(id){
        try{
            let sql = `SELECT * FROM section
            WHERE section_id = ?`;
            const rows = await db.query(sql, [id]);
            return Section.fromRow(rows[0]);
        }catch(err){
            throw new Error(err);
        }
    }

    static async readSectionByName(name){
        try{
            let sql = `SELECT * FROM section
            WHERE section_name = name`;
            const rows = await db.query(sql, [name]);
            return rows.map(row => Section.fromRow(row));
        }catch(err){
            throw new Error(err);
        }
    }

    static async readSectionByStatus(status){
        try{
            let sql = `SELECT * FROM section
            WHERE section_status = ?`;
            const rows = await db.query(sql, [status]);
            return rows.map(row => Section.fromRow(row));
        }catch(err){
            throw new Error(err);
        }
    }

    static async isSectionExistById(id){
        try{
            let sql = `SELECT * FROM section WHERE section_id = ?`;
            const rows = await db.query(sql, [id]);
            return rows.length > 0;
        }catch(err){
            throw new Error(err);
        }
    }

    static async isSectionExistByName(name){
        try{
            let sql = `SELECT * FROM section WHERE section_name = ?`;
            const rows = await db.query(sql, [name]);
            return rows.length > 0;
        }catch(err){
            throw new Error(err);
        }
    }

    static async isSectionExistByStatus(status){
        try{
            let sql = `SELECT * FROM section WHERE section_status = ?`;
            const rows = await db.query(sql, [status]);
            return rows.length > 0;
        }catch(err){
            throw new Error(err);
        }
    }
}

module.exports = SectionRepository;