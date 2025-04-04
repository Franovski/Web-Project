const db = require('../config/db');
const Category = require('../models/categoryModel');

class CategoryRepository{

    /**
     * Creates a new category in the database.
     * @param {Category} category - Category data.
     * @returns {Category} Result of insertion.
     */

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

    /**
     * Updates a category's name.
     * @param {Category} category - Category with updated name and ID.
     * @returns {Category} Update result message and affected rows.
     */


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

    /**
     * Deletes a category by ID.
     * @param {number} id - Category ID.
     * @returns {Category} Deletion result message and affected rows.
     */

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

    /**
     * Reads all categories.
     * @returns {Array} List of all category objects.
     */

    static async readAll(){
        try{
            const rows = await db.query('SELECT * FROM category');
            return rows.map(Category.fromRow);
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Reads a single category by ID.
     * @param {number} id - Category ID.
     * @returns {Category} Category object.
     */

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

    /**
     * Reads categories by name.
     * @param {string} name - Category name.
     * @returns {Array} List of matching categories.
     */

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

    /**
     * Checks if a category exists by ID.
     * @param {number} id - Category ID.
     * @returns {boolean} True if exists, false otherwise.
     */

    static async isCategoryExistById(id) {
        try {
        let sql = `SELECT * FROM category WHERE category_id = ?`;
        const rows = await db.query(sql,[id]);
        return  rows.length > 0;
        } catch (err) {
        throw new Error(err);
        }
    }

    /**
     * Checks if a category exists by name.
     * @param {string} name - Category name.
     * @returns {boolean} True if exists, false otherwise.
     */

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