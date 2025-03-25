const db = require('../config/db');
const Category = require('../models/categoryModel');

class CategoryRepository{

    static async create(category){
        try{
            let sql = `INSERT INTO category
            (category_name)
            VALUES (?)`;

            const {affectedRows, insertId} =
            await db.query(sql, [category.name]); return {
                affectedRows, 
                //insertId
            }
        }catch(err){
            throw new Error(err);
        }
    }

    static async update(category){
        try{
            let sql = `UPDATE category
            SET category_name = ?
            WHERE category_id = ?`;

            const {affectedRows} =
            await db.query(sql, [category.name, category.id]);
            //return {affectedRows};
            return {message: affectedRows > 0 ? "Category updated" : "Update failed", affectedRows};
        }catch(err){
            throw new Error(err);
        }
    }

    static async delete(id){
        try{
            let sql = `DELETE FROM category
            WHERE category_id = ?`;

            const {affectedRows} = await db.query(sql, [id]);
            //return {affectedRows};
            return {message: affectedRows > 0 ? "Category deleted" : "Deletion failed", affectedRows};
        }catch(err){
            throw new Error(err);
        }
    }

    static async readAll(){
        try{
            const rows = await db.query('SELECT * FROM category');
            return rows.map(Category.fromRow);
        }catch(err){
            throw new Error(err);
        }
    }

    static async readCategoryById(id){
        try{
            let sql = `SELECT * FROM category
            WHERE category_id = ${id}`;
            const rows =  await db.query(sql);
            return Category.fromRow(rows[0]);
        }catch(err){
            throw new Error(err);
        }
    }

    static async readCategoryByName(name){
        try{
            let sql = `SELECT * FROM category
            WHERE category_name = ?`;
            const rows = await db.query(sql, [name]);
            return rows.map(row => Category.fromRow(row));
        }catch(err){
            throw new Error(err);
        }
    }

    static async isCategoryExistById(id) {
        try {
        let sql = `SELECT * FROM category WHERE category_id = ?`;
        const rows = await db.query(sql,[id]);
        return  rows.length > 0;
        } catch (err) {
        throw new Error(err);
        }
    }

    static async isCategoryExistByName(name) {
        try {
        let sql = `SELECT * FROM category WHERE category_name = ?`;
        const rows = await db.query(sql,[name]);
        return  rows.length > 0;
        } catch (err) {
        throw new Error(err);
        }
    }
}

module.exports = CategoryRepository;