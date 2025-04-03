const Category = require('../models/sequelizedCategoryModel.js');
const categoryService = require('../services/categoryService.js');
const { Request, Response } = require('express');

/**
 * Controller for handling category-related operations.
 */
class CategoryController {
    /**
     * Creates a new category.
     * @param {Request} req - The request object containing category details.
     * @param {Response} res - The response object.
     */
    static async create(req, res) {
        try {
            const { name } = req.body;
            var category = new Category(0, name);
            const result = await categoryService.create(category);
            res.status(200).json(result);
        } catch (err) {
            console.error("Error in CategoryController.create: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * Updates an existing category.
     * @param {Request} req - The request object containing category details.
     * @param {Response} res - The response object.
     */
    static async update(req, res) {
        try {
            const { name } = req.body;
            const { id } = req.params;
            var category = new Category(id, name);
            const result = await categoryService.update(category);
            res.status(200).json(result);
        } catch (err) {
            console.error("Error in CategoryController.update: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * Deletes a category by ID.
     * @param {Request} req - The request object containing category ID.
     * @param {Response} res - The response object.
     */
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await categoryService.delete(id);
            res.status(200).json(result);
        } catch (err) {
            console.error("Error in CategoryController.delete: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * Retrieves all categories.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     */
    static async readAll(req, res) {
        try {
            const result = await categoryService.readAll();
            res.status(200).json(result);
        } catch (err) {
            console.error("Error in CategoryController.readAll: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * Retrieves a category by its ID.
     * @param {Request} req - The request object containing category ID.
     * @param {Response} res - The response object.
     */
    static async readCategoryById(req, res) {
        try {
            const { id } = req.params;
            const result = await categoryService.readCategoryById(id);
            res.status(200).json(result);
        } catch (err) {
            console.error("Error in CategoryController.readCategoryById: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * Retrieves a category by its name.
     * @param {Request} req - The request object containing category name.
     * @param {Response} res - The response object.
     */
    static async readCategoryByName(req, res) {
        try {
            const { name } = req.params;
            const result = await categoryService.readCategoryByName(name);
            res.status(200).json(result);
        } catch (err) {
            console.error("Error in CategoryController.readCategoryByName: ", err.message);
            res.status(500).json(err.message);
        }
    }
}

module.exports = CategoryController;
