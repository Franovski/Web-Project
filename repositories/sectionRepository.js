const db = require('../config/db');
const Section = require('../models/sectionModel');

class SectionRepository{

    /**
     * Creates a new section in the database.
     * @param {Section} section - Section details.
     * @returns {Section} affectedRows count.
     */

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

    /**
     * Updates an existing section's details.
     * @param {Section} section - Updated section data.
     * @returns {Section} affectedRows count.
     */

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

    /**
     * Deletes a section by ID.
     * @param {number} id - Section ID.
     * @returns {Section} affectedRows count.
     */

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

    /**
     * Reads all sections from the database.
     * @returns {Array} List of all sections.
     */

    static async readAll(){
        try{
            const rows = await db.query('SELECT * FROM section');
            return rows.map(Section.fromRow);
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Reads a section by its ID.
     * @param {number} id - Section ID.
     * @returns {Section} Section object.
     */

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

    /**
     * Reads sections by name.
     * @param {string} name - Section name.
     * @returns {Array} Matching sections.
     */

    static async readSectionByName(name){
        try{
            let sql = `SELECT * FROM section
            WHERE section_name = ?`;
            const rows = await db.query(sql, [name]);
            return rows.map(row => Section.fromRow(row));
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Reads sections by status.
     * @param {string} status - Section status.
     * @returns {Array} Matching sections.
     */

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

    /**
     * Checks if a section exists by its ID.
     * @param {number} id - Section ID.
     * @returns {boolean} Existence result.
     */

    static async isSectionExistById(id){
        try{
            let sql = `SELECT * FROM section WHERE section_id = ?`;
            const rows = await db.query(sql, [id]);
            return rows.length > 0;
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Checks if a section exists by name.
     * @param {string} name - Section name.
     * @returns {boolean} Existence result.
     */

    static async isSectionExistByName(name){
        try{
            let sql = `SELECT * FROM section WHERE section_name = ?`;
            const rows = await db.query(sql, [name]);
            return rows.length > 0;
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Checks if a section exists by status.
     * @param {string} status - Section status.
     * @returns {boolean} Existence result.
     */

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