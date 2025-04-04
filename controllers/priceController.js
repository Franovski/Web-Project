const Price = require('../models/priceModel.js');
const priceService = require('../services/priceService.js');
const { Request, Response } = require('express');

/**
 * Controller for handling price-related operations.
 */
class PriceController {
    /**
     * Creates a new price entry.
     * @param {Request} req - The request object containing price details.
     * @param {Response} res - The response object.
     */
    static async create(req, res) {
        try {
            const { ticketPrice, eventId, sectionId } = req.body;
            var price = new Price(0, ticketPrice, eventId, sectionId);
            const result = await priceService.create(price);
            res.status(200).json({message: "Price created successfully", result});
        } catch (err) {
            console.error("Error in PriceController.create: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * Updates an existing price entry.
     * @param {Request} req - The request object containing updated price details.
     * @param {Response} res - The response object.
     */
    static async update(req, res) {
        try {
            const { ticketPrice, eventId, sectionId } = req.body;
            const { id } = req.params;
            var price = new Price(id, ticketPrice, eventId, sectionId);
            const result = await priceService.update(price);
            res.status(200).json({message: "Price updated successfully", result});
        } catch (err) {
            console.error("Error in PriceController.update: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * Deletes a price entry by ID.
     * @param {Request} req - The request object containing price ID.
     * @param {Response} res - The response object.
     */
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await priceService.delete(id);
            res.status(200).json({message: "Price deleted successfully", result});
        } catch (err) {
            console.error("Error in PriceController.delete: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * Retrieves all price entries.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     */
    static async readAll(req, res) {
        try {
            const result = await priceService.readAll();
            res.status(200).json({message: "Prices retrieved successfully", result});
        } catch (err) {
            console.error("Error in PriceController.readAll: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * Retrieves a price entry by ID.
     * @param {Request} req - The request object containing price ID.
     * @param {Response} res - The response object.
     */
    static async readPriceById(req, res) {
        try {
            const { id } = req.params;
            const result = await priceService.readPriceById(id);
            res.status(200).json({message: "Price retrieved successfully", result});
        } catch (err) {
            console.error("Error in PriceController.readPriceById: ", err.message);
            res.status(500).json(err.message);
        }
    }
}

module.exports = PriceController;
