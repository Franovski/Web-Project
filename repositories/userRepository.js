const db = require('../config/db');
const User = require('../models/userModel');
const Hashing = require('../Utils/hashing');
const Utils = require('../Utils/utils');

class UserRepository{

    static async create(user){
        try{
            let sql = `INSERT INTO user
            (role, created_at, first_name, last_name, email, password, phone_number)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const hashedPassword = await Hashing.hashPassword(user.password);
            const dateFormatted = await Utils.formatDateSQL(user.createdAt);
            const {affectedRows, insertId} =
            await db.query(sql, [user.role, dateFormatted, user.firstName, user.lastName,
                user.email, hashedPassword, user.phoneNbr]); 
            return {
                affectedRows, 
                //insertId
            }
        }catch(err){
            throw new Error(err);
        }
    }

    static async update(user){
        try{
            let sql = `UPDATE user
            SET role = ?, created_at = ?, first_name = ?, last_name = ?, email = ?, password = ?, phone_number = ?
            WHERE user_id = ?`;
            const hashedPassword = await Hashing.hashedPassword(user.password);
            const dateFormatted = await Utils.formatDateSQL(user.createdAt);
            const {affectedRows} =
            await db.query(sql, [user.role, dateFormatted, user.firstName, user.lastName,
                user.email, hashedPassword, user.phoneNbr, user.id]);
            //return {affectedRows};
            return{message: affectedRows > 0 ? "User updated" : "Update failed", affectedRows};
        }catch(err){
            throw new Error(err);
        }
    }

    static async delete(id){
        try{
            let sql = `DELETE FROM user
            WHERE user_id = ?`;

            const {affectedRows} = await db.query(sql, [id]);
            //return {affectedRows};
            return {message: affectedRows > 0 ? "User deleted" : "Deletion failed", affectedRows};
        }catch(err){
            throw new Error(err);
        }
    }

    static async readAll(){
        try{
            const rows = await db.query('SELECT * FROM user');
            return rows.map(User.fromRow);
        }catch(err){
            throw new Error(err);
        }
    }

    static async readUserById(id){
        try{
            let sql = `SELECT * FROM user
            WHERE user_id = ${id}`;
            const rows = await db.query(sql);
            return User.fromRow(rows[0]);
        }catch(err){
            throw new Error(err);
        }
    }

    static async readUserByFirstName(firstName){
        try {
            let sql = `SELECT * FROM user WHERE first_name = ?`;
            const rows = await db.query(sql, [firstName]);
            return rows.map(row => User.fromRow(row));
        } catch (err) {
            throw new Error(err);
        }
    }

    static async readUserByLastName(lastName){
        try{
            let sql = `SELECT * FROM user
            WHERE last_name = ?`;
            const rows = await db.query(sql, [lastName]);
            return rows.map(row => User.fromRow(row));
        }catch(err){
            throw new Error(err);
        }
    }

    static async readUserByEmail(email){
        try{
            let sql = `SELECT * FROM user
            WHERE email = ?`;
            const rows = await db.query(sql, [email]);
            return rows.map(row => User.fromRow(row));
        }catch(err){
            throw new Error(err);
        }
    }

    static async getPasswordByEmail(email){
        try{
            let sql = `SELECT password FROM user
            WHERE email = ?`;
            const rows = await db.query(sql, [email]);
            return rows.map(row => User.fromRow(row));
        }catch(err){
            throw new Error(err);
        }
    }

    static async isUserExistById(id) {
        try {
        let sql = `SELECT * FROM user WHERE user_id = ?`;
        const rows = await db.query(sql,[id]);
        return  rows.length > 0;
        } catch (err) {
        throw new Error(err);
        }
    }

    static async isUserExistByFirstName(firstName) {
        try {
        let sql = `SELECT * FROM user WHERE first_name = ?`;
        const rows = await db.query(sql,[firstName]);
        return  rows.length > 0;
        } catch (err) {
        throw new Error(err);
        }
    }

    static async isUserExistByLastName(lastName) {
        try {
        let sql = `SELECT * FROM user WHERE last_name = ?`;
        const rows = await db.query(sql,[lastName]);
        return  rows.length > 0;
        } catch (err) {
        throw new Error(err);
        }
    }

    static async isUserExistByEmail(email) {
        try {
        let sql = `SELECT * FROM user WHERE email = ?`;
        const rows = await db.query(sql,[email]);
        return  rows.length > 0 ? true : false;
        } catch (err) {
        throw new Error(err);
        }
    }

    //change user password
    static async changePassword(email, newPassword){
        try{
            let sql = `UPDATE user
            SET password = ?
            WHERE email = ?`;
            const hashedPassword = await Hashing.hashPassword(newPassword);
            const {affectedRows} = await db.query(sql, [hashedPassword, email]);
            return affectedRows;
        }catch(err){
            throw new Error(err);
        }
    }
}

module.exports = UserRepository;